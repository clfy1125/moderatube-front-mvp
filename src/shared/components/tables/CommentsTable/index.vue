<!-- (댓글관리 페이지)의 "미분류 댓글, 분류 댓글 테이블" 공용 컴포넌트 -->
<script setup lang="ts">
interface ICommentsTableProps {
  type: 'UNCLASSIFIED' | 'CLASSIFIED';
}

defineProps<ICommentsTableProps>();
const emit = defineEmits<{ (e: 'on-scroll-table', value: number): void }>();
defineOptions({ name: 'CommentsTable' });

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  const scrollLeft = target.scrollLeft;

  emit('on-scroll-table', scrollLeft);
};
</script>

<template>
  <div class="comments-table" :data-type="type" @scroll="handleScroll">
    <div class="t-head">
      <div>번호</div>
      <div>작성자</div>
      <div>댓글 내용</div>
      <div>날짜</div>
      <div>좋아요</div>
      <div>상태</div>
      <div>작업</div>
    </div>
    <ul class="t-body">
      <slot></slot>
    </ul>
  </div>
</template>

<style lang="scss">
.comments-table {
  @include tablet {
    overflow-x: auto;
  }

  .t-head,
  .row {
    & > div {
      min-width: 67px;
      align-content: center;
      overflow: hidden;
      text-overflow: ellipsis;

      &:nth-of-type(1) {
        min-width: 50px;
        max-width: 50px;
      }
    }
  }

  .t-head {
    display: flex;
    height: 29px;
    margin-bottom: 6px;

    @include fontStyle(11px, 600, $gray_3);

    & > div {
      align-content: center;
      text-align: center;
      border-bottom: 1px solid $gray_e;

      &:nth-of-type(2) {
        min-width: 135px;
        max-width: 135px;
      }

      &:nth-of-type(3) {
        flex: 8;

        @include tablet {
          min-width: 213px;
        }

        @include mobile {
          min-width: 105px;
        }
      }

      &:nth-of-type(4),
      &:nth-of-type(5) {
        min-width: 67px;
        max-width: 67px;
      }

      &:nth-of-type(6),
      &:last-of-type {
        min-width: 58px;
        max-width: 58px;
      }
    }
  }

  .t-body {
    min-height: 32px;

    @include mobile {
      margin-bottom: 8px;
    }

    .row {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 32px;

      @media (max-width: 724px) {
        width: fit-content;
      }

      &:nth-of-type(even) {
        background-color: $gray_f9;
      }

      & > span {
        min-width: 135px;
        max-width: 135px;
      }

      & > div {
        &:nth-of-type(1) {
          text-align: center;
        }

        &:nth-of-type(2) {
          flex: 8;

          @include tablet {
            min-width: 213px;
          }

          @include mobile {
            min-width: 105px;
            max-width: 105px;
          }
        }

        &:nth-of-type(3),
        &:nth-of-type(4) {
          min-width: 67px;
          max-width: 67px;
        }

        &:nth-of-type(5) {
          min-width: 58px;
          max-width: 58px;
        }
      }

      &:hover {
        border-radius: 2px;
        background-color: $gray_e;
      }
    }
  }

  &[data-type='UNCLASSIFIED'] {
    .t-head {
      & > div {
        &:last-of-type {
          min-width: 58px;
          max-width: 58px;
        }
      }
    }

    .t-body {
      .row {
        & > div {
          &:nth-of-type(6) {
            min-width: 58px;
            max-width: 58px;
          }
        }
      }
    }
  }

  &[data-type='CLASSIFIED'] {
    .t-head {
      & > div {
        &:last-of-type {
          min-width: 116px;
          max-width: 116px;
        }
      }
    }

    .t-body {
      .row {
        & > div {
          &:nth-of-type(6) {
            min-width: 116px;
            max-width: 116px;
          }
        }
      }
    }
  }
}
</style>
