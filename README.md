# Minecraft AFK Bot — template para servidores autorizados

Este projeto é um ponto de partida para um bot Mineflayer em Minecraft Java, destinado
somente a servidores que permitem bots e automação.

## Limitação importante sobre Aternos

Os termos do Aternos proíbem usar bots, reconexões automáticas repetidas ou atividade
falsa para evitar o desligamento automático. Por esse motivo, este template recusa
conectar a domínios `aternos.me` e `aternos.org` e não faz reconexão automática.
Ele não consegue manter um Aternos ligado 24/7.

## Requisitos

- Node.js 20 ou superior
- Um servidor Minecraft Java que permita expressamente bots
- Acesso/autenticação compatíveis com o servidor

## Executar localmente

1. Extraia o ZIP.
2. Instale o Node.js: https://nodejs.org/
3. Abra um terminal nesta pasta e execute `npm install`.
4. Copie `.env.example` para `.env` e preencha as variáveis.
5. Execute `npm start`.

Não compartilhe o arquivo `.env`, senhas ou tokens de autenticação.

## Hospedar no Render

1. Envie estes arquivos para um repositório privado no GitHub.
2. No Render, crie um Background Worker e conecte o repositório.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Em Environment, configure `MC_HOST`, `MC_PORT`, `MC_USERNAME`, `MC_VERSION`
   e `MC_AUTH`.
6. Escolha um plano que permita execução contínua; o plano gratuito não garante
   disponibilidade 24/7 e Background Workers podem exigir plano pago.

## Variáveis

- `MC_HOST`: host do servidor autorizado.
- `MC_PORT`: porta do servidor.
- `MC_USERNAME`: nome de usuário do bot.
- `MC_VERSION`: versão do Minecraft; opcional se o Mineflayer conseguir detectar.
- `MC_AUTH`: `microsoft` ou `offline`, conforme a configuração do servidor.

## O que não é garantido

Nenhuma hospedagem promete funcionamento literalmente para sempre. O servidor pode
reiniciar, ficar offline, expulsar o bot ou alterar suas regras. O bot não inicia
automaticamente o servidor Minecraft.
