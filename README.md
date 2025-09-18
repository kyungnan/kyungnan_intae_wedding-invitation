# 모바일 청첩장 웹사이트

현대적이고 깔끔한 디자인의 모바일 우선 청첩장 웹사이트입니다.

## 주요 기능

- 📱 모바일 최적화 반응형 디자인
- 💝 카카오페이 송금 연동
- 🖼️ 이미지 갤러리 슬라이더
- 🗺️ 카카오맵/네이버지도 연동
- 📤 카카오톡/문자 공유 기능
- 💳 계좌번호 복사 기능
- ⚡ 빠른 로딩 속도 최적화

## 파일 구조

```
wedding-invitation/
├── index.html          # 메인 HTML 파일
├── styles.css          # CSS 스타일시트
├── script.js           # JavaScript 기능
└── README.md           # 이 파일
```

## 커스터마이징 방법

### 1. 기본 정보 수정

`index.html` 파일에서 다음 정보들을 수정하세요:

- **신랑신부 이름**: `김민수`, `이지영`
- **결혼식 날짜**: `2024년 8월 15일`
- **결혼식 시간**: `오후 2시`
- **결혼식 장소**: `더 컨벤션 웨딩홀 3층 그랜드볼룸`
- **주소**: `서울시 강남구 테헤란로 123`

### 2. 계좌 정보 수정

계좌번호와 은행 정보를 실제 정보로 변경:

```html
<!-- 신랑측 계좌 -->
<p class="bank-name">국민은행</p>
<p class="account-number">123456-78-901234</p>
<p class="account-holder">김민수</p>

<!-- 신부측 계좌 -->
<p class="bank-name">신한은행</p>
<p class="account-number">987654-32-109876</p>
<p class="account-holder">이지영</p>
```

### 3. 사진 교체

플레이스홀더 이미지를 실제 사진으로 교체:

- 메인 히어로 이미지
- 신랑신부 프로필 사진
- 갤러리 사진들

### 4. 연락처 정보 수정

전화번호를 실제 번호로 변경:

```html
<a href="tel:010-1234-5678" class="contact-btn">
<a href="tel:010-9876-5432" class="contact-btn">
```

## 배포 방법

### 1. AWS S3 + CloudFront (추천)

**장점**: 비용 효율적, 빠른 속도, 안정적
**예상 비용**: 월 1,000원 내외

#### 단계별 배포:

1. **S3 버킷 생성**
```bash
aws s3 mb s3://your-wedding-invitation-bucket
```

2. **파일 업로드**
```bash
aws s3 sync . s3://your-wedding-invitation-bucket --exclude "README.md"
```

3. **정적 웹사이트 호스팅 설정**
```bash
aws s3 website s3://your-wedding-invitation-bucket --index-document index.html
```

4. **버킷 정책 설정** (퍼블릭 읽기 권한)

5. **CloudFront 배포 생성** (선택사항, CDN 가속화)

### 2. Vercel (무료)

1. [Vercel](https://vercel.com) 계정 생성
2. GitHub에 코드 업로드
3. Vercel에서 GitHub 저장소 연결
4. 자동 배포 완료

### 3. Netlify (무료)

1. [Netlify](https://netlify.com) 계정 생성
2. 파일들을 드래그 앤 드롭으로 업로드
3. 즉시 배포 완료

### 4. GitHub Pages (무료)

1. GitHub 저장소 생성
2. 파일들 업로드
3. Settings > Pages에서 활성화

## 도메인 연결

### 도메인 구매처
- **AWS Route 53**: 통합 관리 용이
- **가비아**: 한국 업체, 한글 지원
- **후이즈**: 저렴한 가격

### 도메인 연결 방법

1. **도메인 구매** (예: yourwedding.com)
2. **DNS 설정**:
   - A 레코드: 호스팅 서버 IP
   - CNAME: www 서브도메인 설정
3. **SSL 인증서 적용** (Let's Encrypt 무료)

## 카카오 기능 설정

### 카카오 개발자 계정 설정

1. [Kakao Developers](https://developers.kakao.com) 가입
2. 앱 생성 및 JavaScript 키 발급
3. `script.js`에서 키 설정:

```javascript
Kakao.init('YOUR_KAKAO_APP_KEY');
```

### 도메인 등록
- 카카오 개발자 콘솔에서 웹 플랫폼 도메인 등록

## 성능 최적화 팁

### 이미지 최적화
- WebP 포맷 사용 권장
- 적절한 해상도로 리사이징
- 지연 로딩 적용

### 로딩 속도 개선
- CSS/JS 파일 압축
- 이미지 압축
- CDN 사용

## 브라우저 호환성

- ✅ Chrome (Android/iOS)
- ✅ Safari (iOS)
- ✅ Samsung Internet
- ✅ Firefox Mobile
- ✅ Edge Mobile

## 문제 해결

### 카카오페이 연동 안됨
- 카카오톡 앱 설치 확인
- 모바일 환경에서 테스트
- URL 스키마 정확성 확인

### 지도 연동 안됨
- 인터넷 연결 확인
- 앱 설치 여부 확인
- 주소 정보 정확성 확인

### 공유 기능 안됨
- HTTPS 환경에서 테스트
- 카카오 SDK 초기화 확인
- 도메인 등록 확인

## 라이선스

이 프로젝트는 개인 사용을 위한 것입니다. 상업적 사용 시 별도 문의 바랍니다.

## 지원

문제가 발생하거나 추가 기능이 필요한 경우 이슈를 등록해주세요.

---

💕 행복한 결혼식 되세요! 💕
