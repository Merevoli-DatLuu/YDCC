## Cài đặt

**1. Cài đặt pipenv để sử dụng môi trường ảo**
```python
cd YDCC\back-end\YDCC
python -m pip install pipenv
```

**2. Cài đặt các package cần thiết**
```python
python -m pipenv install 
```

**3. Sinh một shell trong môi trường ảo**
```python
python -m pipenv shell
```

**4. Khởi chạy server**


+ Kiểm tra migrations
```python
python manage.py makemigrations
python manage.py migrate
```

+ Khởi chạy server
```python
python manage.py runserver
```

**Admin account**
admin:flazer123!@#
