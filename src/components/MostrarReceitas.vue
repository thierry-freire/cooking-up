<script lang="ts">
import type { PropType } from 'vue';
import BotaoPrincipal from './BotaoPrincipal.vue';
import Receita from './Receita.vue';
import type { IReceita } from '@/interfaces/IReceita';
import { obterReceitas } from '@/http';

    export default {
        props: {
            ingredientes: { type: Object as PropType<string>}
        },
        components: { BotaoPrincipal, Receita },
        emits: ['buscarReceitas'],
        data() {
            return {
                receitas: [] as IReceita[]
            }
        },
        async created() {
            this.receitas = await obterReceitas();
        }
    }
</script>

<template>
    <section class="selecionar-receitas">
        <h1 class="cabecalho titulo-receitas">Receitas</h1>

        <h2 class="sub-titulo">Resultados encontrados: {{ receitas.length }}</h2>

        <p v-if="receitas.length" class="paragrafo-lg instrucoes">
            Veja as opções de receitas que encontramos com os ingredientes que você tem por aí!
        </p>

        <p v-else class="paragrafo-lg instrucoes">
            Ops, não encontramos resultados para sua combinação. Vamos tentar de novo?
        </p>
    
        <ul v-if="receitas.length" class="receitas">
            <li v-for="receita in receitas" :key="receita.nome">
                <Receita :receita="receita"/>
            </li>
        </ul>
    
        <p v-else class="paragrafo lista-vazia">
            <img src="@/assets/imagens/sem-receitas.png" alt="Sem receitas">
        </p>
    
        <BotaoPrincipal @click="$emit('buscarReceitas')" texto="Editar lista"/>
    </section>
</template>

<style scoped>
    .sub-titulo {
        text-align: center;
        color: var(--verde-medio, #3D6D4A);
        font-weight: 700;
    }

    .titulo-receitas {
        color: var(--verde-medio, #3D6D4A);
        display: block;
        margin-bottom: 1.5rem;
    }

    .receitas {
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        flex-wrap: wrap;
    }

    .selecionar-receitas {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .instrucoes {
        margin-bottom: 2rem;
    }

    .lista-vazia {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.25rem;

        color: var(--coral, #F0633C);
        text-align: center;
    }
</style>