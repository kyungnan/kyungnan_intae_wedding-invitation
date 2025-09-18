// 전역 변수
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// 카카오 SDK 초기화 (실제 앱 키로 교체 필요)
// Kakao.init('YOUR_KAKAO_APP_KEY');

// 손글씨 애니메이션 함수
function startHandwritingAnimation() {
    const lines = [
        { elementId: 'line-1', text: 'Our' },
        { elementId: 'line-2', text: 'Wedding' },
        { elementId: 'line-3', text: '2025.12.14' }
    ];
    
    // 모든 라인에 전체 텍스트를 미리 설정하되 투명하게
    lines.forEach(line => {
        const element = document.getElementById(line.elementId);
        if (element) {
            element.innerHTML = '';
            
            for (let i = 0; i < line.text.length; i++) {
                const span = document.createElement('span');
                span.textContent = line.text[i];
                span.style.opacity = '0';
                // 로딩 화면과 완전히 동일한 스타일 적용
                span.style.setProperty('font-family', 'Alex Brush, cursive', 'important');
                span.style.setProperty('color', '#b71c1c', 'important');
                span.style.setProperty('font-weight', '400', 'important');
                span.style.setProperty('text-shadow', 'none', 'important');
                span.style.fontStyle = 'normal';
                span.style.webkitFontSmoothing = 'antialiased';
                span.style.letterSpacing = '2px';
                span.style.textStroke = '0';
                span.style.webkitTextStroke = '0';
                span.style.filter = 'contrast(0.7) brightness(1.3)';
                span.style.fontStretch = 'normal';
                // 강제 적용
                span.style.cssText += '; color: #b71c1c !important; font-family: Alex Brush, cursive !important;';
                element.appendChild(span);
            }
        }
    });
    
    let lineIndex = 0;
    let charIndex = 0;
    
    setTimeout(() => {
        const interval = setInterval(() => {
            if (lineIndex < lines.length) {
                const currentLine = lines[lineIndex];
                const element = document.getElementById(currentLine.elementId);
                if (element) {
                    const spans = element.querySelectorAll('span');
                    
                    if (charIndex < spans.length) {
                        spans[charIndex].style.opacity = '1';
                        charIndex++;
                    } else {
                        lineIndex++;
                        charIndex = 0;
                    }
                }
            } else {
                clearInterval(interval);
            }
        }, 150);
    }, 300);
}

// 페이지 로딩 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 로딩 시작 시 스크롤 방지
    document.body.classList.add('loading');
    
    // 로딩 화면 반투명 배경 설정
    const loadingScreen = document.getElementById('loading');
    loadingScreen.style.setProperty('background', 'rgba(0, 0, 0, 0.3)', 'important');
    
    // 로딩 화면 표시
    loadingScreen.style.opacity = '1';
    
    // 로딩 화면 숨기기
    setTimeout(() => {
        const loadingElement = document.getElementById('loading');
        const mainContent = document.getElementById('main-content');
        
        if (loadingElement) {
            loadingElement.style.opacity = '0';
            setTimeout(() => {
                loadingElement.style.display = 'none';
                if (mainContent) {
                    mainContent.classList.add('loaded');
                }
                // 로딩 완료 시 스크롤 허용
                document.body.classList.remove('loading');
                // 손글씨 애니메이션 시작
                startHandwritingAnimation();
            }, 500);
        }
    }, 2500);

    // 스크롤 애니메이션 초기화
    initScrollAnimations();
    
    // 갤러리 초기화
    initGallery();
});

// 스크롤 애니메이션
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll('.section-content, .detail-item, .person-info, .account-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 갤러리 초기화
function initGallery() {
    if (slides.length > 0) {
        showSlide(0);
    }
}

// 슬라이드 변경
function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

// 특정 슬라이드로 이동
function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// 슬라이드 표시
function showSlide(index) {
    // 모든 슬라이드 숨기기
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // 모든 점 비활성화
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // 현재 슬라이드와 점 활성화
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

// 자동 슬라이드 (선택사항)
function startAutoSlide() {
    setInterval(() => {
        changeSlide(1);
    }, 4000);
}

// 계좌번호 복사
function copyAccount(accountNumber) {
    const formattedAccount = accountNumber.replace(/(\d{6})(\d{2})(\d{6})/, '$1-$2-$3');
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(formattedAccount).then(() => {
            showToast('계좌번호가 복사되었습니다.');
        }).catch(() => {
            fallbackCopyTextToClipboard(formattedAccount);
        });
    } else {
        fallbackCopyTextToClipboard(formattedAccount);
    }
}

// 클립보드 복사 대체 방법
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('계좌번호가 복사되었습니다.');
    } catch (err) {
        showToast('복사에 실패했습니다. 수동으로 복사해주세요.');
    }
    
    document.body.removeChild(textArea);
}

// 카카오페이 송금
function sendKakaoPay(bankCode, accountNumber, holderName) {
    // 모바일 환경 체크
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // 카카오페이 앱 실행 시도
        const kakaoPayUrl = `kakaotalk://kakaopay/money/to/bank?bank_code=${bankCode}&account=${accountNumber}&holder_name=${encodeURIComponent(holderName)}`;
        
        // 앱 실행 시도
        window.location.href = kakaoPayUrl;
        
        // 앱이 설치되지 않은 경우를 대비한 대체 방안
        setTimeout(() => {
            if (confirm('카카오톡 앱이 설치되어 있지 않거나 실행할 수 없습니다. 카카오페이 웹으로 이동하시겠습니까?')) {
                window.open('https://pay.kakao.com', '_blank');
            }
        }, 2000);
    } else {
        // 웹 환경에서는 카카오페이 웹으로 이동
        window.open('https://pay.kakao.com', '_blank');
        showToast('카카오페이 웹페이지로 이동합니다.');
    }
}

// 지도 관련 함수들
function openKakaoMap() {
    const address = '서울시 강남구 테헤란로 123';
    const placeName = '더 컨벤션 웨딩홀';
    
    // 모바일에서는 카카오맵 앱 실행 시도
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        const kakaoMapUrl = `kakaomap://search?q=${encodeURIComponent(placeName + ' ' + address)}`;
        window.location.href = kakaoMapUrl;
        
        // 앱이 없는 경우 웹으로 이동
        setTimeout(() => {
            window.open(`https://map.kakao.com/link/search/${encodeURIComponent(placeName)}`, '_blank');
        }, 1000);
    } else {
        window.open(`https://map.kakao.com/link/search/${encodeURIComponent(placeName)}`, '_blank');
    }
}

function openNaverMap() {
    const address = '서울시 강남구 테헤란로 123';
    const placeName = '더 컨벤션 웨딩홀';
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        const naverMapUrl = `nmap://search?query=${encodeURIComponent(placeName + ' ' + address)}`;
        window.location.href = naverMapUrl;
        
        setTimeout(() => {
            window.open(`https://map.naver.com/v5/search/${encodeURIComponent(placeName)}`, '_blank');
        }, 1000);
    } else {
        window.open(`https://map.naver.com/v5/search/${encodeURIComponent(placeName)}`, '_blank');
    }
}

// 공유 기능들
function shareKakao() {
    // 실제 카카오 SDK가 초기화된 경우
    if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '김민수 ♥ 이지영 결혼식에 초대합니다',
                description: '2024년 8월 15일 오후 2시\n더 컨벤션 웨딩홀 3층 그랜드볼룸',
                imageUrl: 'https://via.placeholder.com/800x600/f8f4f0/d4af37?text=Wedding+Invitation',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href
                }
            },
            buttons: [
                {
                    title: '청첩장 보기',
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href
                    }
                }
            ]
        });
    } else {
        // 카카오 SDK가 없는 경우 대체 방안
        const text = '김민수 ♥ 이지영 결혼식에 초대합니다\n2024년 8월 15일 오후 2시\n' + window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: '결혼식 초대장',
                text: text,
                url: window.location.href
            });
        } else {
            copyURL();
        }
    }
}

function shareSMS() {
    const message = `김민수 ♥ 이지영 결혼식에 초대합니다\n\n2024년 8월 15일 오후 2시\n더 컨벤션 웨딩홀 3층 그랜드볼룸\n\n청첩장: ${window.location.href}`;
    
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
}

function copyURL() {
    const url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showToast('링크가 복사되었습니다.');
        }).catch(() => {
            fallbackCopyTextToClipboard(url);
        });
    } else {
        fallbackCopyTextToClipboard(url);
    }
}

// 토스트 메시지 표시
function showToast(message) {
    // 기존 토스트 제거
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 새 토스트 생성
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 애니메이션
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // 3초 후 제거
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 부드러운 스크롤
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 터치 스와이프 지원 (갤러리용)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 왼쪽으로 스와이프 (다음 슬라이드)
            changeSlide(1);
        } else {
            // 오른쪽으로 스와이프 (이전 슬라이드)
            changeSlide(-1);
        }
    }
}

// 페이지 가시성 변경 시 자동 슬라이드 제어
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 페이지가 숨겨졌을 때 자동 슬라이드 정지
        clearInterval(autoSlideInterval);
    } else {
        // 페이지가 다시 보일 때 자동 슬라이드 재시작
        startAutoSlide();
    }
});

// 자동 슬라이드 시작 (선택사항)
let autoSlideInterval;
// startAutoSlide(); // 주석 해제하면 자동 슬라이드 활성화

// 이미지 지연 로딩
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 성능 최적화를 위한 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 윈도우 리사이즈 이벤트 최적화
window.addEventListener('resize', debounce(() => {
    // 리사이즈 시 필요한 작업들
    console.log('Window resized');
}, 250));
// D-Day Countdown
function updateCountdown() {
    const weddingDate = new Date('2025-12-14T11:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
        document.getElementById('dday-number').textContent = days;
    } else {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        document.getElementById('dday-number').textContent = '0';
    }
}

// 페이지 로드 시 카운트다운 시작
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
// 지도 앱 열기 함수들
function openNaverMap() {
    const address = "경기 성남시 분당구 탄천상로151번길 20";
    const url = `https://map.naver.com/v5/search/${encodeURIComponent(address)}`;
    window.open(url, '_blank');
}

function openTMap() {
    // T맵 웹 검색 URL로 변경
    const url = 'https://www.tmap.co.kr/tmap2/mobile/route.jsp?name=분당앤스퀘어&lon=127.1069711&lat=37.3400457';
    window.open(url, '_blank');
}

function openKakaoNavi() {
    const address = "경기도 성남시 분당구 탄천상로 151번길 20 분당앤스퀘어";
    const url = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;
    window.open(url, '_blank');
}

// 카카오맵 API 초기화
function initKakaoMap() {
    if (typeof kakao !== 'undefined' && kakao.maps) {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.3400457, 127.1069711), // 분당앤스퀘어 웨딩홀 정확한 좌표
            level: 4
        };
        
        const map = new kakao.maps.Map(container, options);
        
        const markerPosition = new kakao.maps.LatLng(37.3400457, 127.1069711);
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
        
        marker.setMap(map);
        
        const infowindow = new kakao.maps.InfoWindow({
            content: '<div style="padding:8px; font-size:12px; text-align:center;">분당앤스퀘어 4층</div>'
        });
        
        infowindow.open(map, marker);
        
        // 지도 타입 컨트롤 추가
        const mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
        
        // 줌 컨트롤 추가
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        
    } else {
        console.log('카카오맵 API 로드 실패');
        const mapContainer = document.getElementById('map');
        mapContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 400px; background: #f8f9fa; color: #666; flex-direction: column;">
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 3rem; margin-bottom: 20px; color: #c9a876;">📍</div>
                    <h4 style="margin: 0 0 10px 0; color: #333; font-size: 1.2rem;">분당앤스퀘어 (구.베어캐슬) 4층</h4>
                    <p style="margin: 5px 0; color: #666;">경기도 성남시 분당구 탄천상로 151번길 20</p>
                    <p style="margin: 5px 0; color: #888; font-size: 0.9rem;">Tel. 031-728-5300</p>
                </div>
            </div>
        `;
    }
}
// 갤러리 기능
let currentImageIndex = 0;
let galleryImages = [];

// 갤러리 이미지 로드
function loadGalleryImages() {
    // 웨딩 갤러리 이미지들 (최적화된 버전)
    const imageList = [
        '색1 (1)_optimized.jpg',
        '색1 (2)_optimized.jpg',
        '3-2 재수정_optimized.jpg',
        '4-2 재수정_optimized.jpg',
        '5-1 재수정_optimized.jpg',
        '색1 (6)_optimized.jpg',
        '7-1 재수정_optimized.jpg',
        '8-1 재수정_optimized.jpg',
        '9-1 재수정_optimized.jpg',
        '색1 (10)_optimized.jpg',
        '색1 (11)_optimized.jpg',
        '12-2 재수정_optimized.jpg',
        '13-3 재수정_optimized.jpg',
        '15-1 재수정_optimized.jpg',
        '색1 (16)_optimized.jpg',
        '색1 (17)_optimized.jpg',
        '18-1 재수정_optimized.jpg',
        '색1 (19)_optimized.jpg',
        '20-1 재수정_optimized.jpg',
        '색1 (21)_optimized.jpg',
        '색1 (22)_optimized.jpg',
        '색1 (23)_optimized.jpg',
        '24-1 재수정_optimized.jpg'
    ];
    
    galleryImages = imageList;
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (galleryGrid) {
        imageList.forEach((imageSrc, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `<img src="${imageSrc}" alt="갤러리 이미지 ${index + 1}" onclick="openModal(${index})">`;
            galleryGrid.appendChild(galleryItem);
        });
    }
}

// 갤러리 더보기/접기 토글
function toggleGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryFade = document.getElementById('galleryFade');
    const moreBtn = document.querySelector('.gallery-more-btn');
    
    if (galleryGrid.classList.contains('expanded')) {
        // 접기
        galleryGrid.classList.remove('expanded');
        galleryFade.classList.remove('hidden');
        moreBtn.classList.remove('rotated');
    } else {
        // 펼치기
        galleryGrid.classList.add('expanded');
        galleryFade.classList.add('hidden');
        moreBtn.classList.add('rotated');
    }
}

// 계좌 카드 토글 기능
function toggleAccountCard(header) {
    const card = header.parentElement;
    const arrow = header.querySelector('.account-arrow');
    const details = card.querySelector('.account-details');
    
    card.classList.toggle('expanded');
    details.classList.toggle('expanded');
    
    if (card.classList.contains('expanded')) {
        arrow.textContent = '∧';
    } else {
        arrow.textContent = '∨';
    }
}

// 계좌번호 복사 기능
function copyAccount(accountNumber) {
    navigator.clipboard.writeText(accountNumber).then(function() {
        alert('계좌번호가 복사되었습니다: ' + accountNumber);
    }).catch(function(err) {
        console.error('복사 실패:', err);
        // 폴백: 텍스트 선택
        const textArea = document.createElement('textarea');
        textArea.value = accountNumber;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('계좌번호가 복사되었습니다: ' + accountNumber);
    });
}

// 모달 열기
function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    modal.style.display = 'block';
    modalImg.src = galleryImages[index];
}

// 모달 닫기
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// 이전/다음 이미지
function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    document.getElementById('modalImage').src = galleryImages[currentImageIndex];
}

// 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', function() {
    loadGalleryImages();
    
    // 더보기 버튼 이벤트 (요소가 존재할 때만)
    const galleryMoreBtn = document.getElementById('galleryMoreBtn');
    if (galleryMoreBtn) {
        galleryMoreBtn.addEventListener('click', toggleGallery);
    }
    
    // 모달 닫기 이벤트 (요소가 존재할 때만)
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (closeBtn) closeBtn.onclick = closeModal;
    if (prevBtn) prevBtn.onclick = () => changeImage(-1);
    if (nextBtn) nextBtn.onclick = () => changeImage(1);
    
    // BGM 제어 기능
    const bgm = document.getElementById('bgm');
    const bgmToggle = document.getElementById('bgm-toggle');
    let isPlaying = false;

    if (bgm && bgmToggle) {
        // BGM 볼륨 설정
        bgm.volume = 0.3;

        // 자동 재생 시도 함수
        function tryAutoPlay() {
            bgm.play().then(function() {
                bgmToggle.innerHTML = '<div class="pause-icon"></div>';
                isPlaying = true;
            }).catch(function(error) {
                console.log('자동 재생 실패:', error);
                bgmToggle.innerHTML = '<div class="play-icon"></div>';
                isPlaying = false;
            });
        }

        // 즉시 재생 시도
        tryAutoPlay();
        
        // 여러 시점에서 재생 시도
        setTimeout(tryAutoPlay, 100);
        setTimeout(tryAutoPlay, 500);
        setTimeout(tryAutoPlay, 1000);

        // BGM 토글 버튼 클릭 이벤트
        bgmToggle.addEventListener('click', function() {
            if (isPlaying) {
                bgm.pause();
                bgmToggle.innerHTML = '<div class="play-icon"></div>';
                isPlaying = false;
            } else {
                bgm.play().catch(function(error) {
                    console.log('음악 재생 실패:', error);
                });
                bgmToggle.innerHTML = '<div class="pause-icon"></div>';
                isPlaying = true;
            }
        });

        // 사용자 상호작용 시 재생 시도
        document.addEventListener('click', function() {
            if (!isPlaying) {
                tryAutoPlay();
            }
        });

        // 터치 이벤트에서도 재생 시도
        document.addEventListener('touchstart', function() {
            if (!isPlaying) {
                tryAutoPlay();
            }
        });

        // 음악이 끝났을 때 처리
        bgm.addEventListener('ended', function() {
            bgmToggle.innerHTML = '<div class="play-icon"></div>';
            isPlaying = false;
        });
    }
    
    // 모달 외부 클릭시 닫기
    window.onclick = function(event) {
        const modal = document.getElementById('imageModal');
        if (event.target === modal) {
            closeModal();
        }
    }
    
    // 키보드 이벤트
    document.addEventListener('keydown', function(event) {
        const modal = document.getElementById('imageModal');
        if (modal.style.display === 'block') {
            if (event.key === 'Escape') {
                closeModal();
            } else if (event.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (event.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });
});
