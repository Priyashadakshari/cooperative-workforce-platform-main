from fastapi import FastAPI
from pydantic import BaseModel
import re

app = FastAPI()


# -----------------------------
# Request Parser
# -----------------------------

class RequestIn(BaseModel):
    text: str


@app.get("/")
def home():
    return {
        "message": "AI Service is running"
    }


@app.post("/parse-request")
def parse_request(req: RequestIn):

    text = req.text.lower()

    service_keywords = {
        "electrician": [
            "wiring",
            "switch",
            "electric",
            "power",
            "fan",
            "light"
        ],
        "plumber": [
            "pipe",
            "leak",
            "tap",
            "water",
            "drain"
        ],
        "carpenter": [
            "wood",
            "door",
            "furniture",
            "cabinet"
        ],
        "solar": [
            "solar",
            "inverter",
            "panel"
        ]
    }

    matched_service = "general"

    for service, keywords in service_keywords.items():

        if any(keyword in text for keyword in keywords):
            matched_service = service
            break

    urgency = "high" if any(
        word in text
        for word in [
            "urgent",
            "now",
            "immediately",
            "asap"
        ]
    ) else "normal"

    time_match = re.search(
        r"(today|tomorrow|tonight|morning|evening|afternoon)",
        text
    )

    return {
        "service": matched_service,
        "urgency": urgency,
        "time_hint": (
            time_match.group(0)
            if time_match
            else None
        )
    }


# -----------------------------
# FairMatch
# -----------------------------

class Worker(BaseModel):
    id: str
    skillMatch: float
    distanceKm: float
    experienceYears: float
    rating: float
    jobsLast30Days: int


class MatchRequest(BaseModel):
    workers: list[Worker]


@app.post("/fairmatch")
def fairmatch(req: MatchRequest):

    results = []

    for worker in req.workers:

        distance_score = max(
            0,
            1 - (worker.distanceKm / 20)
        )

        experience_score = min(
            worker.experienceYears / 10,
            1
        )

        rating_score = worker.rating / 5

        fairness_score = 1 / (
            1 + worker.jobsLast30Days
        )

        final_score = (
            0.35 * worker.skillMatch
            + 0.25 * distance_score
            + 0.15 * experience_score
            + 0.15 * rating_score
            + 0.10 * fairness_score
        )

        results.append({
            "workerId": worker.id,
            "matchScore": round(
                final_score * 100,
                1
            )
        })

    results.sort(
        key=lambda x: x["matchScore"],
        reverse=True
    )

    return {
        "ranked": results
    }


# -----------------------------
# Combined Request
# -----------------------------

class FullMatchRequest(BaseModel):
    text: str
    workers: list[Worker]


@app.post("/match-request")
def match_request(req: FullMatchRequest):

    text = req.text.lower()

    service_keywords = {
        "electrician": [
            "wiring",
            "switch",
            "electric",
            "power",
            "fan",
            "light"
        ],
        "plumber": [
            "pipe",
            "leak",
            "tap",
            "water",
            "drain"
        ],
        "carpenter": [
            "wood",
            "door",
            "furniture",
            "cabinet"
        ],
        "solar": [
            "solar",
            "inverter",
            "panel"
        ]
    }

    matched_service = "general"

    for service, keywords in service_keywords.items():

        if any(keyword in text for keyword in keywords):
            matched_service = service
            break

    urgency = "high" if any(
        word in text
        for word in [
            "urgent",
            "now",
            "immediately",
            "asap"
        ]
    ) else "normal"

    time_match = re.search(
        r"(today|tomorrow|tonight|morning|evening|afternoon)",
        text
    )

    time_hint = (
        time_match.group(0)
        if time_match
        else None
    )

    ranked_workers = []

    for worker in req.workers:

        distance_score = max(
            0,
            1 - (worker.distanceKm / 20)
        )

        experience_score = min(
            worker.experienceYears / 10,
            1
        )

        rating_score = worker.rating / 5

        fairness_score = 1 / (
            1 + worker.jobsLast30Days
        )

        final_score = (
            0.35 * worker.skillMatch
            + 0.25 * distance_score
            + 0.15 * experience_score
            + 0.15 * rating_score
            + 0.10 * fairness_score
        )

        ranked_workers.append({
            "workerId": worker.id,
            "matchScore": round(
                final_score * 100,
                1
            )
        })

    ranked_workers.sort(
        key=lambda x: x["matchScore"],
        reverse=True
    )

    return {
        "request": {
            "service": matched_service,
            "urgency": urgency,
            "time_hint": time_hint
        },
        "ranked_workers": ranked_workers
    }
