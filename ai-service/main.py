from fastapi import FastAPI
from pydantic import BaseModel
import re

app = FastAPI()

SERVICE_KEYWORDS = {
    "electrician": ["wiring", "switch", "electric", "power", "fan", "light"],
    "plumber": ["pipe", "leak", "tap", "water", "washing machine", "drain"],
    "carpenter": ["wood", "door", "furniture", "cabinet"],
    "solar": ["solar", "inverter", "panel"],
}


class RequestIn(BaseModel):
    text: str


@app.post("/parse-request")
def parse_request(req: RequestIn):
    text = req.text.lower()

    matched_service = "general"

    for service, keywords in SERVICE_KEYWORDS.items():
        if any(k in text for k in keywords):
            matched_service = service
            break

    urgency = (
        "high"
        if any(w in text for w in ["urgent", "now", "immediately", "asap"])
        else "normal"
    )

    time_match = re.search(
        r"(today|tomorrow|tonight|morning|evening|afternoon)",
        text
    )

    return {
        "service": matched_service,
        "urgency": urgency,
        "time_hint": time_match.group(0) if time_match else None,
    }
