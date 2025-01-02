# Nginx reverse proxy server + HTTPS

## mkcert로 SSL 인증서 만들기
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
  - www.local.dev.kurly.com
  - www.local.stg.kurly.com
  - www.local.perf.kurly.com
  - localhost
  - 127.0.0.1
  - ::1 (IPv6 localhost)

## Nginx reverse proxy 설정(conf.d/default.conf)
파일의 주석을 참고하세요.

## Docker compose(docker-compose.yml)
파일의 주석을 참고하세요.

## 도커 컨테이너 구동
```
docker compose up
```
- 3000포트로 구동하는 로컬 서버를 먼저 실행
- 허용 도메인으로 접속, 확인

## www.local.kurly.com 하나로 모든 환경을 대응
- event-container 프로젝트에서 서버 띄우기
  1. npm i
  2. .env.local 파일에서 테스트 할 환경으로 수정(dev, stg, perf)
  3. npm run dev
- 프록시 컨테이너 실행
  1. docker compose up
- 접속 & 테스트
  1. https://www.local.kurly.com/live?channelId=ch_2q0s5820yw0NPZlJNvk8gKb03nS
  2. '좋아요' 누르고 비로그인 상태인 경우 로그인 수행
  3. '좋아요' 정상 동작 확인

## 개인 도메인(이름.local.kurly.com) 대응
- 프록시 컨테이너 실행까지 동일
- 개인 도메인으로 접속 & 테스트