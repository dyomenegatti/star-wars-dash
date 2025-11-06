<template>
    <div class="film-detail" v-if="showFilmDetail">
        <div class="film-detail__header">
            <span @click="handleClose">x</span>
        </div>

        <div class="film-detail__content" v-if="filmsDetail">
            <div class="film-detail__main-info">
                <div class="film-detail__poster">
                    <img 
                        :src="getFullPosterUrl(filmsDetail.poster)" 
                        :alt="filmsDetail.title"
                        class="film-detail__poster-image"
                    >
                </div>

                
            </div>

            <div class="film-detail__details">
                <div class="film-detail__details-header">
                    <h2 class="film-detail__episode-title">{{ filmsDetail.title }}</h2>
                    <h4 class="film-detail__episode-number">({{ filmsDetail.episode_id }})</h4>
                </div>
                
                <div class="film-detail__details-synopsis">
                    <div class="film-detail__details-text">
                        {{ filmsDetail.opening_crawl }}
                    </div>
                </div>

                <div class="film-detail__infos">
                    <div class="film-detail__infos-date">{{ formatReleaseDate(filmsDetail.release_date) }}</div>
                    <div class="film-detail__infos-director">
                        <span>Director: </span>
                        {{ filmsDetail.director }}
                    </div>
                    <div class="film-detail__infos-producer">
                        <span>Producer: </span>
                        {{ filmsDetail.producer }}
                    </div>
                </div>

                <div class="film-detail__amount">
                    <categories
                        title="characters"
                        :amount="filmsDetail.characters.length"
                        :icon="darthVaderIcon"
                    />
                    <categories
                        title="planets"
                        :amount="filmsDetail.planets.length"
                        :icon="deathStarIcon"
                    />
                    <categories
                        title="species"
                        :amount="filmsDetail.species.length"
                        :icon="r2d2Icon"
                    />
                    <categories
                        title="starships"
                        :amount="filmsDetail.starships.length"
                        :icon="milleniumFalconIcon"
                    />
                    <categories
                        title="vehicles"
                        :amount="filmsDetail.vehicles.length"
                        :icon="xWingIcon"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Categories from '../Category/Categories.vue';
import darthVaderIcon from '@/assets/icons/darth_vader.svg';
import deathStarIcon from '@/assets/icons/death_star.svg';
import r2d2Icon from '@/assets/icons/r2d2.svg';
import milleniumFalconIcon from '@/assets/icons/millenium_falcon.svg';
import xWingIcon from '@/assets/icons/x_wing.svg';

export default {
    name: 'FilmDetail',
    components: { Categories, },
    props: {
        filmsDetail: {
            type: Object, 
            required: false, 
            default: null
        },
        showFilmDetail: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            darthVaderIcon: darthVaderIcon,
            deathStarIcon: deathStarIcon,
            r2d2Icon: r2d2Icon,
            milleniumFalconIcon: milleniumFalconIcon,
            xWingIcon: xWingIcon,
        }
    },
    methods: {
        handleClose() {
            this.$emit('close-film-detail');
        },
        getFullPosterUrl(posterPath) {
            if (!posterPath) {
                return '/placeholder.jpg'; 
            }
            return `https://image.tmdb.org/t/p/w500${posterPath}`;
        },
        formatReleaseDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR');
        },
    },
}
</script>

<style lang="scss" scoped>
.film-detail {
    display: flex;
    flex-direction: column;
    padding: 16px;
    min-height: 100vh;

    &__header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 20px;

        span {
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            transition: all 0.3s ease;

            &:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.1);
            }
        }
    }

    &__content {
        display: flex;
        gap: 32px;
        flex: 1;

        @media (min-width: 769px) {
            flex-direction: row;
            align-items: flex-start;
        }

        @media (max-width: 768px) {
            flex-direction: column;
            gap: 24px;
        }
    }
    
    &__main-info {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;

        @media (min-width: 769px) {
            max-width: 350px;
        }

        @media (max-width: 768px) {
            align-items: center;
            width: 100%;
        }
    }
    
    &__poster {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
    }
    
    &__poster-image {
        width: 100%;
        height: auto;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        transition: transform 0.3s ease;

        @media (min-width: 1200px) {
            max-width: 350px;
        }

        @media (min-width: 769px) and (max-width: 1199px) {
            max-width: 280px;
        }

        @media (min-width: 481px) and (max-width: 768px) {
            max-width: 250px;
        }

        @media (max-width: 480px) {
            max-width: 200px;
        }
        
        &:hover {
            transform: scale(1.02);
        }
    }

    &__details {
        display: flex;
        flex-direction: column;
        gap: 20px;
        flex: 1;
        min-width: 0; 

        @media (max-width: 768px) {
            gap: 16px;
        }
    }

    &__details-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 8px;

        @media (max-width: 768px) {
            flex-direction: column;
            gap: 8px;
            text-align: center;
        }

        h2 {
            color: #fff;
            font-size: 1.8rem;
            margin: 0;

            @media (max-width: 768px) {
                font-size: 1.5rem;
            }

            @media (max-width: 480px) {
                font-size: 1.3rem;
            }
        }
    }

    &__episode-number {
        color: #F5D10D;
        margin: 0;
        font-size: 1.2rem;

        @media (max-width: 768px) {
            font-size: 1.1rem;
        }

        @media (max-width: 480px) {
            font-size: 1rem;
        }
    }

    &__details-synopsis {
        margin: 16px 0;
    }

    &__details-text {
        font-style: italic;
        color: #ccc;
        line-height: 1.6;
        font-size: 1rem;

        @media (max-width: 768px) {
            font-size: 0.95rem;
            text-align: justify;
        }

        @media (max-width: 480px) {
            font-size: 0.9rem;
        }
    }

    &__infos {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin: 20px 0;

        @media (max-width: 768px) {
            gap: 12px;
            margin: 16px 0;
        }
    }
    
    &__infos-date {
        background: #F5D10D;
        color: #181818;
        padding: 8px 16px; 
        border-radius: 50px;
        font-weight: 700;
        width: fit-content; 
        font-size: 0.9rem;

        @media (max-width: 768px) {
            align-self: center;
        }

        @media (max-width: 480px) {
            padding: 6px 12px;
            font-size: 0.85rem;
        }
    }
    
    &__infos-director,
    &__infos-producer {
        color: #ffffff; 
        font-size: 0.95rem;
        line-height: 1.4;

        @media (max-width: 768px) {
            text-align: center;
            font-size: 0.9rem;
        }

        @media (max-width: 480px) {
            font-size: 0.85rem;
        }

        span {
            font-style: italic;
            font-weight: 500;
            padding-right: 8px;
            color: #F5D10D;
        }
    }

    &__amount {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 20px;
        margin-top: 20px;

        @media (min-width: 769px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (min-width: 481px) and (max-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
        }

        @media (max-width: 480px) {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-top: 16px;
        }
    }
}

@media screen and (max-height: 500px) and (orientation: landscape) {
    .film-detail {
        &__content {
            flex-direction: row;
        }

        &__poster-image {
            max-width: 200px;
        }

        &__details-header {
            flex-direction: row;
            
            h2 {
                font-size: 1.3rem;
            }
        }
    }
}
</style>