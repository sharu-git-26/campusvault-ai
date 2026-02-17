from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "PG_LEVEL_SUPER_SECRET"
ALGORITHM = "HS256"

def create_token(user_id):
    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + timedelta(hours=10)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token):
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return int(data["sub"])
    except:
        return None
