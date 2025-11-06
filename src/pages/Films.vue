<template>
    <div class="films-page">
        <section class="films-page__carousel-section">
            <film-carousel 
                :films="carouselFilms" 
                :is-loading="isLoading"
                @film-clicked="handleOpenFilm"
                v-if="!showFilmDetail"
            />
        </section>

        <section class="films-page__detail-section">
            <film-detail 
                :films-detail="detailFilm"
                :show-film-detail="showFilmDetail"
                @close-film-detail="closeFilmDetail"
            />
        </section>
    </div>
</template>

<script>
import tmdb from '@/services/tmdb';
import swapi from '@/services/swapi';
import FilmCarousel from '@/components/Films/FilmCarousel.vue';
import FilmDetail from '@/components/Films/FilmDetail.vue';

export default {
    name: 'Films',
    components: { 
        FilmCarousel, 
        FilmDetail, 
    },
    data() {
        return {
            carouselFilms: [],
            detailFilm: null,
            isLoading: false,
            hasError: false,
            showFilmDetail: false,
        }
    },
    async mounted() {
        await this.fetchFilmsWithPosters();
        
        this.$root.$on('reset-to-carousel', this.resetToCarousel);
    },
    beforeDestroy() {
        this.$root.$off('reset-to-carousel', this.resetToCarousel);
    },
    methods: {
        async fetchFilmsWithPosters() {
            this.isLoading = true;
            this.hasError = false;
            
            try {
                const swapiResponse = await swapi.get('/films');
                const films = swapiResponse.data.results;
                
                const filmsWithCompleteData = await Promise.all(
                    films.map(async (film) => {
                        const tmdbResponse = await tmdb.get('/search/movie', {
                            params: { query: `Star Wars ${film.title}` }
                        });
                        
                       return { 
                            ...film, 
                            poster: tmdbResponse.data.results[0]?.poster_path || null 
                        };
                    })
                );

                this.carouselFilms = filmsWithCompleteData;
                
            } catch (error) {
                this.hasError = true;
            } finally {
                this.isLoading = false;
            }
        },
        handleOpenFilm(film) {
            this.showFilmDetail = true;
            this.detailFilm = film;
        },
        closeFilmDetail() {
            this.detailFilm = null;
            this.showFilmDetail = false;
        },
        resetToCarousel() {
            this.showFilmDetail = false;
            this.detailFilm = null;
        },
    }
}
</script>

<style lang="scss" scoped>
.films-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    overflow-x: hidden;

    @media (min-width: 1200px) {
        max-width: 90vw;
        padding: 40px;
    }

    @media (min-width: 769px) and (max-width: 1199px) {
        max-width: 95vw;
        padding: 30px;
    }

    @media (max-width: 768px) {
        max-width: 100vw;
        padding: 16px;
        gap: 16px;
    }

    &__title {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #fff;
        text-align: center;

        @media (max-width: 768px) {
            font-size: 1.8rem;
            margin-bottom: 0.8rem;
        }

        @media (max-width: 480px) {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
    }
    
    &__carousel-section {
        width: 100%;
        
        @media (max-width: 768px) {
            width: 100vw;
            margin-left: -16px;
            margin-right: -16px;
        }
    }
    
    &__detail-section {
        width: 100%;
        
        @media (max-width: 768px) {
            width: 100vw;
            margin-left: -16px;
            margin-right: -16px;
        }
    }
}
</style>