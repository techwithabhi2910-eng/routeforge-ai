
import os
from typing import List

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from google import genai
from google.genai import types

load_dotenv()

app = FastAPI(title="RouteForge AI Backend")

# ---------- CORS Configuration ----------
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept", "Authorization"],
)

PRIMARY_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")
FALLBACK_MODELS = [
    PRIMARY_MODEL,
    "gemini-3-flash-preview",
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash",
]
MODEL_CANDIDATES = list(dict.fromkeys(FALLBACK_MODELS))


# ---------- Request model ----------

class RoadmapRequest(BaseModel):
    target_role: str = Field(min_length=2, max_length=150)
    current_skills: List[str] = Field(default_factory=list)
    weekly_hours: int = Field(gt=0, le=168)
    budget_inr: float = Field(ge=0)
    completed_skills: List[str] = Field(default_factory=list)


# ---------- AI response models ----------

class RoadmapNode(BaseModel):
    id: str
    label: str
    type: str
    completed: bool = False


class RoadmapEdge(BaseModel):
    id: str
    source: str
    target: str


class Route(BaseModel):
    name: str
    description: str
    nodes: List[RoadmapNode]
    edges: List[RoadmapEdge]


class Routes(BaseModel):
    fastest_practical: Route
    budget_friendly: Route
    portfolio_first: Route


class RoadmapResponse(BaseModel):
    target_role: str
    routes: Routes
    note: str


# ---------- Basic endpoints ----------

@app.get("/")
def home():
    return {"message": "RouteForge AI backend is running!"}


@app.get("/health")
def health():
    return {"status": "healthy"}


# ---------- Gemini-powered roadmap ----------

@app.post("/api/roadmap", response_model=RoadmapResponse)
def generate_roadmap(request: RoadmapRequest):

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="Gemini API key is missing. Check backend/.env."
        )

    client = genai.Client(api_key=api_key)

    prompt = f"""
You are the AI career-planning engine for RouteForge AI.

Create a personalized learning roadmap for this target career.

USER PROFILE:
Target role: {request.target_role}
Current skills: {request.current_skills}
Completed skills: {request.completed_skills}
Available study hours per week: {request.weekly_hours}
Total learning budget in INR: {request.budget_inr}

Return exactly three different routes:

1. fastest_practical:
   Name: Fastest Practical Route.
   Prioritize essential skills, focused learning and practical projects.

2. budget_friendly:
   Name: Budget-Friendly Route.
   Prioritize free resources, open-source tools and low-cost projects.
   Respect the user's stated budget.

3. portfolio_first:
   Name: Portfolio-First Route.
   Prioritize demonstrable projects and portfolio evidence while
   teaching the skills needed to complete those projects.

ROADMAP REQUIREMENTS:
- Generate a genuinely personalized roadmap, not generic placeholder data.
- Include 5 to 8 nodes in each route.
- Use node types such as skill, project, certification, milestone
  or resource.
- Give every node a unique ID across all three routes.
- Give every edge a unique ID.
- Edges must connect valid node IDs within their own route.
- Arrange nodes in a logical learning sequence.
- Use completed=true for skills that match the user's current or
  completed skills. Do not mark unrelated skills complete.
- Avoid unnecessarily repeating skills the user already knows.
- Consider the available weekly study hours when estimating scope.
- Do not invent exact course URLs, certification prices or guaranteed
  job outcomes. Use resource names or search suggestions when uncertain.
- Make the three routes meaningfully different.
- Return a concise description for each route.
- Return a short note explaining that this is an AI-generated plan
  that the user can adapt as they progress.

Return only data matching the required JSON response schema.
"""

    try:
        response = None
        last_error = None

        for model_name in MODEL_CANDIDATES:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        response_mime_type="application/json",
                        response_schema=RoadmapResponse,
                        temperature=0.4,
                    ),
                )
                if response:
                    break
            except Exception as candidate_err:
                last_error = candidate_err
                print(f"[Backend] Model {model_name} failed: {type(candidate_err).__name__}. Retrying fallback candidate...")
                continue

        if response is None:
            raise ValueError(f"All candidate models failed. Last error: {type(last_error).__name__}: {last_error}")

        if response.parsed is not None:
            result = response.parsed
        elif response.text:
            result = RoadmapResponse.model_validate_json(response.text)
        else:
            raise ValueError("Gemini returned an empty response.")

        # Apply the user's existing progress to matching nodes.
        known_skills = {
            skill.strip().casefold()
            for skill in (
                request.current_skills + request.completed_skills
            )
        }

        for route in result.routes.model_dump().values():
            for node in route["nodes"]:
                if node["type"] == "skill":
                    if node["label"].strip().casefold() in known_skills:
                        node["completed"] = True

        return result.model_copy(
            update={
                "target_role": request.target_role,
                "routes": Routes.model_validate(
                    result.routes.model_dump()
                ),
                "note": (
                    "AI-generated roadmap. Adapt it as your skills, "
                    "schedule and career goals evolve."
                ),
            }
        )

    except HTTPException:
        raise

    except Exception as exc:
        print(f"Roadmap generation failed: {type(exc).__name__}: {exc}")

        raise HTTPException(
            status_code=502,
            detail=(
                "Could not generate the roadmap with Gemini. "
                "Check your API key, model availability and API quota, "
                "then try again."
            ),
        )
