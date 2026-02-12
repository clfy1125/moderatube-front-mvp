# moderatube-front-mvp

YouTube 스팸 댓글 관리 프론트엔드 애플리케이션

## 기술 스택

- Vue 3 + TypeScript
- Vite
- Vue Router
- Pinia (State Management)
- TanStack Query (Vue Query)
- Axios
- SCSS

## 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
VITE_LOCAL=http://localhost:5173
VITE_DEPLOY=https://your-domain.com
VITE_TYPE=DEV
VITE_API_URL=your-backend-api-url
VITE_STORE_ID=your-store-id
VITE_CHANNEL_KEY=your-channel-key
VITE_PORTONE_API_SECRET=your-portone-api-secret
```

## 개발 환경 설정

```bash
# 의존성 설치
npm install --legacy-peer-deps

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## Vercel 배포

이 프로젝트는 Vercel을 통해 자동 배포됩니다.

### Vercel 환경 변수 설정
배포 후 Vercel 대시보드에서 다음 환경 변수를 설정해야 합니다:
- `VITE_DEPLOY`
- `VITE_API_URL`
- `VITE_STORE_ID`
- `VITE_CHANNEL_KEY`
- `VITE_PORTONE_API_SECRET`

