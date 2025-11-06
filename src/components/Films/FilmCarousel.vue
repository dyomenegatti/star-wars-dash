<template>
    <div class="film-carousel">
        <div v-if="isLoading" class="film-carousel__skeleton">
            <div class="film-carousel__wrapper">
                <div class="film-carousel__track">
                    <div class="film-carousel__slide active">
                        <div class="film-carousel__skeleton-poster"></div>
                    </div>
                </div>
            </div>
            <div class="film-carousel__controls">
                <div 
                    v-for="n in 6" 
                    :key="n"
                    class="film-carousel__skeleton-indicator"
                    :class="{ 'active': n === 1 }"
                ></div>
            </div>
        </div>

        <div v-else>
            <div class="film-carousel__wrapper">
                <div class="film-carousel__track" ref="track">
                    <div
                        v-for="(film, index) in films"
                        :key="index"
                        class="film-carousel__slide"
                        :class="{ active: index === currentIndex }"
                    >
                        <img 
                            :src="getFullPosterUrl(film.poster)" 
                            :alt="film.title"
                            class="film-carousel__poster" 
                            @click="$emit('film-clicked', film, $event)"
                        >
                    </div>
                </div>
            </div>

            <div class="film-carousel__controls">
                <button
                    v-for="(film, index) in films"
                    :key="index"
                    class="film-carousel__indicator"
                    :class="{ 'film-carousel__indicator--active': index === currentIndex }"
                    @click="goToSlide(index)"
                ></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FilmCarousel',
    props: {
        films: {
          type: Array,
          required: true
        },
        isLoading: {
          type: Boolean,
          default: false
        }
    },
    data() {
        return {
            currentIndex: 0,
            autoPlay: true,
            autoPlayInterval: null,
        }
    },
    mounted() {
        if(this.autoPlay && !this.isLoading && this.films.length > 0) {
            this.startAutoPlay();
        }
    },
    watch: {
        isLoading(newVal) {
            if (!newVal && this.autoPlay && this.films.length > 0) {
                this.startAutoPlay();
            } else {
                this.stopAutoPlay();
            }
        },
        films: {
            handler(newFilms) {
                if (newFilms.length > 0 && !this.isLoading && this.autoPlay) {
                    this.startAutoPlay();
                }
            },
            immediate: true
        }
    },
    beforeDestroy() {
        this.stopAutoPlay();
    },
    emits: ['film-clicked'],
    methods: {
        nextSlide() {
            if(this.currentIndex < this.films.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
        },
        goToSlide(index) {
            this.currentIndex = index;
        },
        getFullPosterUrl(posterPath) {
            if (!posterPath) {
            return '/placeholder.jpg'; 
            }
            return `https://image.tmdb.org/t/p/w500${posterPath}`;
        },
        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, 6000); 
        },
        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.film-carousel {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  
  &__skeleton {
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  &__skeleton-poster {
    width: auto;
    height: 700px;
    max-height: 700px;
    background: linear-gradient(90deg, 
      rgba(255,255,255,0.1) 25%, 
      rgba(255,255,255,0.2) 50%, 
      rgba(255,255,255,0.1) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    aspect-ratio: 2/3;
    max-width: 466px;
  }
  
  &__skeleton-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    animation: pulse 1.5s ease-in-out infinite;
    
    &.active {
      background: rgba(255,255,255,0.4);
      transform: scale(1.2);
    }
    
    &:nth-child(2) { animation-delay: 0.1s; }
    &:nth-child(3) { animation-delay: 0.2s; }
    &:nth-child(4) { animation-delay: 0.3s; }
    &:nth-child(5) { animation-delay: 0.4s; }
    &:nth-child(6) { animation-delay: 0.5s; }
  }
  
  &__wrapper {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    cursor: pointer;
  }
  
  &__track {
    overflow: hidden;
    width: 100vw;
    height: 700px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &__slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.5s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    &.active {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  &__poster {
    width: auto;
    height: 700px;
    max-height: 700px;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  &__controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  &__indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255,255,255,0.6);
    }
    
    &--active {
      background: #fff;
      transform: scale(1.2);
    }
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}
</style>