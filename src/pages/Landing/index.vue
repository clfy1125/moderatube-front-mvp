<script setup lang="ts">
import { onMounted } from 'vue';

import { useRouter } from 'vue-router';

import { getTokens } from '@/shared/api/token';

defineOptions({ name: 'LandingPage' });

const router = useRouter();

const goToApp = () => {
  router.push('/app');
};

onMounted(() => {
  const localTokens = getTokens();
  if (!localTokens) return;

  const { accessToken, refreshToken } = JSON.parse(localTokens);
  if (accessToken || refreshToken) router.replace('/app');
});
</script>

<template>
  <div class="landing-page">
    <!-- Navbar -->
    <nav class="landing-nav">
      <div class="nav-inner">
        <div class="nav-logo"></div>
        <button class="nav-cta" @click="goToApp">시작하기</button>
      </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-badge">AI COMMENT MANAGER</div>
        <h1 class="hero-title">
          AI로 끝내는<br />
          <span class="hero-highlight">유튜브 스팸댓글</span>
        </h1>
        <p class="hero-desc">
          Moderatube는 최신 AI 기술로 스팸댓글을 1초 만에 자동 차단해드립니다.<br />
          크리에이터는 오직 콘텐츠 제작에만 집중하세요.
        </p>
        <button class="hero-btn" @click="goToApp">무료로 시작하기</button>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="features-inner">
        <div class="features-badge">FEATURES</div>
        <h2 class="features-title">유튜브 채널 관리를 위한 완벽한 솔루션</h2>
        <p class="features-desc">Moderatube 하나로 댓글 관리부터 채널 분석까지 한 번에 해결하세요.</p>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon icon-ai"></div>
            <h3>AI 댓글 관리</h3>
            <p>실시간 스팸 자동 삭제</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon icon-dashboard"></div>
            <h3>실시간 감지 현황</h3>
            <p>데이터 대시보드</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon icon-multi"></div>
            <h3>다중 채널 관리</h3>
            <p>여러 채널을 한 곳에서</p>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Technology -->
    <section class="technology">
      <div class="technology-inner">
        <div class="features-badge">AI TECHNOLOGY</div>
        <h2 class="features-title">단순 키워드 차단으로는 막을 수 없습니다</h2>
        <p class="features-desc">교묘하게 빗겨가는 신종 스팸, 문맥을 이해하는 AI만이 잡을 수 있습니다.</p>

        <div class="tech-comparison">
          <div class="tech-card tech-before">
            <div class="tech-label label-before">BEFORE</div>
            <h3>기존 금칙어 필터링</h3>
            <p>변형된 키워드를 일일이 등록해야 하며, 새로운 패턴에 취약합니다.</p>
          </div>
          <div class="tech-arrow">→</div>
          <div class="tech-card tech-after">
            <div class="tech-label label-after">AFTER</div>
            <h3>AI 문맥 분석 엔진</h3>
            <p>유해성 점수와 문맥을 분석하여 변종 스팸까지 99.8% 잡아냅니다.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="cta-inner">
        <h2>지금 바로 시작하세요</h2>
        <p>스팸 댓글 걱정 없는 깨끗한 채널을 만들어 보세요.</p>
        <button class="hero-btn" @click="goToApp">무료로 시작하기</button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="landing-footer">
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-logo"></div>
          <p class="footer-copyright">&copy; 2026 Moderatube. All rights reserved.</p>
          <div class="footer-links">
            <a href="/terms-of-service" target="_blank">이용약관</a>
            <a href="/privacy-policy" target="_blank">개인정보처리방침</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>주식회사 씨엘에프와이 대표 : 김시현</p>
          <p>사업자 등록번호 : 582-86-03901</p>
          <p>언양읍 유니스트길 50, 307동 1층 유니스파크, 울주군 44919</p>
          <p>+827080987102</p>
          <p>문의 : contact@moderatube.com</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.landing-page {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background-color: #fff;
  font-family: Pretendard, Inter, system-ui, sans-serif;
}

/* Navbar */
.landing-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #f0f0f0;
}

.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  width: 180px;
  height: 36px;
  background-image: url('@/shared/assets/moderatube-logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;

  @include mobile {
    width: 150px;
    height: 30px;
  }
}

.nav-cta {
  padding: 8px 20px;
  border-radius: 8px;
  background: linear-gradient(135deg, #4E4DA8 0%, #C7386A 100%);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
}

/* Hero */
.hero {
  padding: 100px 24px 80px;
  text-align: center;
  background: linear-gradient(180deg, #fff 0%, #f5f3ff 50%, #fff5f7 100%);

  @include mobile {
    padding: 60px 20px 50px;
  }
}

.hero-inner {
  max-width: 700px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(78, 77, 168, 0.1) 0%, rgba(199, 56, 106, 0.1) 100%);
  color: $key_color;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 28px;
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.3;
  color: #111;
  margin-bottom: 24px;

  @include mobile {
    font-size: 32px;
  }
}

.hero-highlight {
  background: linear-gradient(135deg, #4E4DA8 0%, #C7386A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 17px;
  line-height: 1.7;
  color: #666;
  margin-bottom: 40px;

  @include mobile {
    font-size: 15px;

    br {
      display: none;
    }
  }
}

.hero-btn {
  display: inline-block;
  padding: 14px 36px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4E4DA8 0%, #C7386A 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  transition: opacity 0.2s, transform 0.15s;
  box-shadow: 0 4px 16px rgba(78, 77, 168, 0.25);

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(199, 56, 106, 0.3);
  }
}

/* Features */
.features {
  padding: 100px 24px;
  text-align: center;

  @include mobile {
    padding: 60px 20px;
  }
}

.features-inner,
.technology-inner {
  max-width: 1000px;
  margin: 0 auto;
}

.features-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid transparent;
  background-image: linear-gradient(#fff, #fff), linear-gradient(135deg, #4E4DA8, #C7386A);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  color: $key_color;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.features-title {
  font-size: 32px;
  font-weight: 800;
  color: #111;
  margin-bottom: 14px;

  @include mobile {
    font-size: 24px;
  }
}

.features-desc {
  font-size: 16px;
  color: #888;
  margin-bottom: 50px;

  @include mobile {
    font-size: 14px;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @include mobile {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.feature-card {
  padding: 36px 24px;
  border-radius: 16px;
  border: 1px solid #eee;
  background-color: #fafafa;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(78, 77, 168, 0.1);
    border-color: rgba(78, 77, 168, 0.2);
  }

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #222;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #888;
  }
}

.feature-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 20px;
  border-radius: 12px;
  background-color: rgba(78, 77, 168, 0.08);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 24px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(78, 77, 168, 0.08) 0%, rgba(199, 56, 106, 0.08) 100%);
    border-radius: 12px;
  }

  &.icon-ai {
    background-image: url('@/shared/assets/comment-icon.svg');
  }

  &.icon-dashboard {
    background-image: url('@/shared/assets/dashboard-icon.svg');
  }

  &.icon-multi {
    background-image: url('@/shared/assets/channel-setting-icon.svg');
  }
}

/* Technology */
.technology {
  padding: 100px 24px;
  text-align: center;
  background-color: #f9f9fb;

  @include mobile {
    padding: 60px 20px;
  }
}

.tech-comparison {
  display: flex;
  align-items: stretch;
  gap: 24px;
  margin-top: 10px;

  @include mobile {
    flex-direction: column;
    gap: 16px;
  }
}

.tech-arrow {
  display: flex;
  align-items: center;
  font-size: 28px;
  color: #ccc;
  font-weight: 700;

  @include mobile {
    justify-content: center;
    transform: rotate(90deg);
  }
}

.tech-card {
  flex: 1;
  padding: 32px 24px;
  border-radius: 16px;
  text-align: left;

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #222;
    margin-bottom: 12px;
  }

  p {
    font-size: 14px;
    line-height: 1.7;
    color: #666;
  }
}

.tech-before {
  background-color: #fff;
  border: 1px solid #eee;
}

.tech-after {
  background-color: #fff;
  border: 2px solid transparent;
  background-image: linear-gradient(#fff, #fff), linear-gradient(135deg, #4E4DA8, #C7386A);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 4px 20px rgba(78, 77, 168, 0.12);
}

.tech-label {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 16px;
}

.label-before {
  background-color: #fee2e2;
  color: #dc2626;
}

.label-after {
  background: linear-gradient(135deg, rgba(78, 77, 168, 0.12) 0%, rgba(199, 56, 106, 0.12) 100%);
  color: $key_color;
}

/* CTA */
.cta {
  padding: 100px 24px;
  text-align: center;

  @include mobile {
    padding: 60px 20px;
  }
}

.cta-inner {
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-size: 32px;
    font-weight: 800;
    color: #111;
    margin-bottom: 14px;

    @include mobile {
      font-size: 24px;
    }
  }

  p {
    font-size: 16px;
    color: #888;
    margin-bottom: 36px;
  }
}

/* Footer */
.landing-footer {
  background-color: #fafafa;
  border-top: 1px solid #eee;
  padding: 40px 24px 32px;
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.footer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid #eee;

  @include mobile {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}

.footer-logo {
  width: 160px;
  height: 32px;
  background-image: url('@/shared/assets/moderatube-logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;
}

.footer-copyright {
  font-size: 13px;
  color: #aaa;
}

.footer-links {
  display: flex;
  gap: 20px;

  a {
    font-size: 13px;
    color: #888;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: #444;
    }
  }
}

.footer-bottom {
  padding-top: 20px;

  p {
    font-size: 12px;
    color: #bbb;
    line-height: 1.8;
  }
}
</style>
