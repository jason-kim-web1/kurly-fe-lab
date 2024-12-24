# Nginx reverse proxy server + HTTPS

## mkcerts로 SSL 인증서 만들기
[Github](https://github.com/FiloSottile/mkcert)  

#### 1. 설치
```
brew install mkcert
```

#### 2. certgen.sh 실행
```
./certgen.sh
```
파일을 실행하면 다음 작업을 합니다.
- certs 폴더를 만들고 이동
- 다음 도메인에 대한 인증, 키 파일 생성(key.pem, cert.pem)
  - www.local.kurly.com
  - localhost
  - 127.0.0.1
  - ::1 (IPv6의 localhost)

## Nginx reverse proxy 설정(conf.d/default.conf)
파일의 주석을 참고하세요.

## Docker compose(docker-compose.yml)
파일의 주석을 참고하세요.

## 도커 컨테이너 구동
```
docker compose up
```
- 3000포트로 구동하는 로컬 서버를 먼저 실행
- https://www.local.kurly.com 접속, 확인