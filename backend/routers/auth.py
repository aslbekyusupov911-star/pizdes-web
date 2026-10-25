import secrets
from fastapi import APIRouter, HTTPException, status
from .. import schemas

router = APIRouter(prefix="/api/auth", tags=["Auth (Admin autentifikatsiya)"])

ACTIVE_TOKENS = set()
VALID_PASSWORDS = ["admin", "ranch2026", "123456", "admin123"]

@router.post("/login", response_model=schemas.LoginResponse)
def login(data: schemas.LoginRequest):
    if data.password in VALID_PASSWORDS:
        token = secrets.token_hex(32)
        ACTIVE_TOKENS.add(token)
        return {
            "success": True,
            "token": token,
            "message": "Muvaffaqiyatli kirildi"
        }
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Parol noto'g'ri")

@router.post("/verify")
def verify_token(token: str):
    if token in ACTIVE_TOKENS:
        return {"valid": True}
    return {"valid": False}
