import styled from "styled-components";

export const Container = styled.div`
    //usamos display grid, pq vai ser 3 itens, do mesmo tamanho, um ao lado do outro    
    display: grid;
    //Aqui estamos informando que queremos 3 colunas de tamanhos iguais
    grid-template-columns: repeat(3, 1fr); //podemos usar também, 1fr 1fr 1fr
    //gap que é o espaçamento entre cada um dos grids
    gap: 2rem;
    margin-top: -10rem;

    //usamos estilo cascata, onde vamos estilizar todas as divs que estão dentro do "container"
    div{
        background: var(--shape);
        padding: 1.5rem 2rem;
        border-radius: 0.25rem;
        color: var(--text-title);
      
        header{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }   

        strong{
            display: block;
            margin-top: 1rem;
            font-size: 2rem;
            font-weight: 500;
            line-height: 3rem;
        }

        &.highlight-background{
            background: var(--green);
            color: #fff;
        }
    }
`;