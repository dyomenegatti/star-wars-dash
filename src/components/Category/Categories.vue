<template>
    <div class="categories">
      <div class="categories__infos">
        <span class="categories__infos-title">{{ title }}</span>
  
        <span class="categories__infos-amount">{{ amount }}</span>
      </div>

      <div class="categories__icon">
        <img
          :src="icon"
          :alt="title"
          class="categories__icon-image"  
        >
      </div>
    </div>
</template>

<script>
export default {
  name: 'Categories',
  props: {
    title: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
  },
}
</script>

<style scoped lang="scss">
.categories {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  background: #1E1E1E;
  color: #FFF;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 100px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
  }

  @media (min-width: 769px) {
    padding: 24px;
    gap: 20px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    padding: 18px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 8px;
    min-height: 80px;
  }

  &__infos {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;

    @media (max-width: 480px) {
      gap: 2px;
    }
  }

  &__infos-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    letter-spacing: 0.5px;
    text-transform: capitalize;
    margin-bottom: 4px;

    @media (min-width: 769px) {
      font-size: 16px;
    }

    @media (max-width: 480px) {
      font-size: 12px;
      margin-bottom: 2px;
    }
  }

  &__infos-amount {
    font-weight: 900;
    font-size: 32px;
    line-height: 1;
    letter-spacing: -1px;
    color: #FFBA33;

    @media (min-width: 1200px) {
      font-size: 42px;
    }

    @media (min-width: 481px) and (max-width: 768px) {
      font-size: 28px;
    }

    @media (max-width: 480px) {
      font-size: 24px;
    }
  }

  &__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &-image {
      color: #181818;
      width: 4rem;
      height: auto;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));

      @media (min-width: 1200px) {
        width: 5rem;
      }

      @media (min-width: 481px) and (max-width: 768px) {
        width: 3.5rem;
      }

      @media (max-width: 480px) {
        width: 2.5rem;
      }
    }
  }
}
</style>