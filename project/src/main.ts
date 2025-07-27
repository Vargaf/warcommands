import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'
//
// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `
//
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

import { diContainer } from "./config/dependencyInjection/diContainer";
import {GameEngineService} from "./Warcommands/GameEngine/Domain/Service/GameEngine.service.ts";
import {GameUIService} from "./Warcommands/GameUI/Domain/Service/GameUI.service.ts";

//import {GameService} from "./Warcommands_old/GameEngineUI/GameService/Domain/service/game.service.ts";


//const gameService: GameService = diContainer.get(GameService);
//gameService.play();



const gameUI: GameUIService = diContainer.get(GameUIService);
const gameEngine: GameEngineService = diContainer.get(GameEngineService);
gameUI.initialize();
gameEngine.start();