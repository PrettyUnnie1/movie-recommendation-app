FROM python:3.10-slim

WORKDIR /app

# Copy requirements từ đúng vị trí
COPY src-backend/requirements.txt .

# Cài đặt thư viện
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ backend code
COPY src-backend/ .

# Copy thư mục Data vào
COPY Data ./Data

CMD ["python", "app.py"]
