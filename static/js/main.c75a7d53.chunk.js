(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{21:function(e,t,r){},23:function(e,t,r){"use strict";r.r(t);var o=r(0),a=r.n(o),n=r(11),i=r.n(n),s=(r(21),r(6)),c=r(3);let l=function(e){return e.SINGLE="SINGLE",e.MULTI="MULTI",e}({});var d=class{constructor(e){this._baseURL=void 0,this._playerName=void 0,this._cells=void 0,this._gameNumbers=void 0,this._gameStatus=void 0,this._roomID=void 0,this._gameMode=void 0,this._rooms=void 0,this._baseURL="https://two4pointsgameonline-backend.onrender.com/game",this._playerName=e,this._cells={},this._gameNumbers=[],this._gameStatus={gameStatus:"false",winner:"",winnerFormula:""},this._roomID=null,this._gameMode=null,console.log("GameClient initialized with player:",e),this._rooms={}}async getOnlinePlayerNumber(){try{const e=await fetch(`${this._baseURL}/players/count`);if(!e.ok)throw console.error("Server response:",e.status,e.statusText),new Error(`HTTP error! status: ${e.status}`);return e.json()}catch(e){throw console.error("Error fetching online player number:",e),e}}async verifyPlayerName(){try{const e=await fetch(`${this._baseURL}/player/${this._playerName}`);if(!e.ok){if(409===e.status){const t=await e.json();throw new Error(t.message)}throw new Error("Unexpected error: "+e.status)}}catch(e){throw console.error("Player Already logged in:",e),e}}async createRoom(e){try{console.log("creating game");const t=await fetch(`${this._baseURL}/room/${e}`,{method:"POST"}),r=await t.text();return this._roomID=r,console.log("GameClient roomID",r),this._gameMode=l.SINGLE,r}catch(t){throw console.error("Error creating room:",t),t}}async fetchRooms(){try{const e=await fetch(`${this._baseURL}/rooms/available`);if(!e.ok)throw console.error("Server response:",e.status,e.statusText),new Error(`HTTP error! status: ${e.status}`);return await e.json()}catch(e){throw console.error("Error fetching rooms:",e),e}}async addPlayer(e){try{const t=await fetch(`${this._baseURL}/player/add/${e}`,{method:"PUT"});if(!t.ok){const e=await t.json();throw new Error(e.message)}}catch(t){throw console.error("Error adding player:",t),t}}async joinGame(e){try{const t=await fetch(`${this._baseURL}/room/${e}/add/player/${this._playerName}`,{method:"PUT"});if(!t.ok){const e=await t.json();throw new Error(e.message)}this._roomID=e;const r=await t.json();this._updateGameState(r)}catch(t){throw console.error("Error joining game:",t),t}}exitGame(){try{fetch(`${this._baseURL}/player/remove/${this._playerName}`,{method:"DELETE",keepalive:!0}),this._roomID=null}catch(e){throw console.error("Error during exit:",e),e}}async addToken(e){try{const t=await fetch(`${this._baseURL}/room/${this._roomID}/add/token/${this._playerName}`,{method:"PUT",headers:{"Content-Type":"text/plain"},body:e}),r=await t.json();this._updateGameState(r)}catch(t){throw console.error("Error adding token:",t),t}}async removeToken(){try{const e=await fetch(`${this._baseURL}/room/${this._roomID}/remove/token/${this._playerName}`,{method:"PUT"}),t=await e.json();this._updateGameState(t),console.log("reveived data after remove",t)}catch(e){throw console.error("Error removing token:",e),e}}async clearFormula(){try{const e=await fetch(`${this._baseURL}/room/${this._roomID}/clear/formula/${this._playerName}`,{method:"PUT"}),t=await e.json();this._updateGameState(t),console.log("reveived data after clear",t)}catch(e){throw console.error("Error clearing formula:",e),e}}async startNewGame(){try{const e=await fetch(`${this._baseURL}/room/${this._roomID}/newgame/game1`,{method:"PUT"}),t=await e.json();this._updateGameState(t)}catch(e){throw console.error("Error starting new game:",e),e}}async fetchGamePage(){try{const e=await fetch(`${this._baseURL}/room/${this._roomID}/state`),t=await e.json();console.log("fetch",e),this._updateGameState(t)}catch(e){throw console.error("Error fetching game state:",e),e}}setRoomID(e){this._roomID=e}getCurrentPlayerFormula(){var e;return(null===(e=this._cells[this._playerName])||void 0===e?void 0:e.formula)||""}getCurrentPlayerResult(){var e;return console.log("Current Player Result: ",this._cells[this._playerName].result),(null===(e=this._cells[this._playerName])||void 0===e?void 0:e.result)||"0"}getCurrentPlayerError(){var e;return(null===(e=this._cells[this._playerName])||void 0===e?void 0:e.error)||""}getGameNumbersString(){return this._gameNumbers}isGameFinished(){return"true"===this._gameStatus.gameStatus}getWinner(){return this._gameStatus.winner}getWinnerFormula(){return this._gameStatus.winnerFormula}getGameStatus(){return this._gameStatus.gameStatus}getPlayerName(){return this._playerName}getOtherPlayers(){const e={};for(const[t,r]of Object.entries(this._cells))t!==this._playerName&&(e[t]={formula:r.formula||"",value:r.result||"0"});return e}_updateGameState(e){console.log("Raw data received:",e),console.log("Players structure:",e.players),e.players&&this._playerName in e.players&&console.log("Current player cell:",e.players[this._playerName]),this._cells=e.players,this._gameNumbers=e.gameNumbers,this._gameStatus=e.gameStatus}resetClient(){this._cells={},this._gameNumbers=[],this._gameStatus={gameStatus:"false",winner:"",winnerFormula:""},this._roomID=null,this._gameMode=null}},m=r(1);const h=Object(o.createContext)({client:null,setGameClient:()=>{}}),u=e=>{let{children:t}=e;const[r,a]=Object(o.useState)(null);return Object(m.jsx)(h.Provider,{value:{client:r,setGameClient:a},children:t})};var p=r(4);const b=p.a.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    padding: 20px;
`,x=p.a.h1`
    font-size: 4rem;
    color: #fff;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`,g=p.a.p`
    font-size: 1.2rem;
    color: #e2e8f0;
    margin-bottom: 2rem;
`,j=p.a.div`
    background: rgba(255, 255, 255, 0.95);
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
`,f=p.a.h2`
    text-align: center;
    color: #2d3748;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
`,y=p.a.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`,O=p.a.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`,w=p.a.label`
    color: #4a5568;
    font-size: 0.9rem;
`,v=(p.a.input`
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #4299e1;
    }
`,p.a.button`
    background: #4299e1;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;

    &:hover {
        background: #3182ce;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`),k=p.a.div`
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
`,_=p.a.h3`
    color: #2d3748;
    font-size: 1.2rem;
    margin-bottom: 1rem;
`,S=p.a.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`,C=p.a.p`
    color: #4a5568;
    font-size: 0.9rem;
`,N=p.a.div`
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.9);
    padding: 10px 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,P=p.a.div`
    width: 8px;
    height: 8px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse 1.5s infinite;

    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`,E=p.a.span`
    color: #1f2937;
    font-weight: 500;
`,T=p.a.div`
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`,G=p.a.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`,R=p.a.h1`
  font-size: 24px;
  margin: 0;
  color: #2a2a2a;
`,I=(p.a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`,p.a.div`
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  font-size: 18px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid #e0e0e0;
  color: #333;
  word-break: break-word;
  margin: 10px 0;
`),$=p.a.div`
  background: #e6f7ff;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border: 1px solid #91d5ff;
  color: #0050b3;
  margin: 5px 0 15px 0;
`,L=p.a.input`
  padding: 10px;
  width: 200px;
  border: 2px solid #d3d6da;
  border-radius: 4px;
  font-size: 16px;
`,U=p.a.div`
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  h2 {
      color: #52c41a;
      margin-top: 0;
      margin-bottom: 16px;
  }

  div {
      margin-bottom: 8px;
  }
`,z=p.a.div`
  font-weight: bold;
  font-size: 20px;
  margin: 12px 0;
  padding: 12px;
  background: #fff;
  border-radius: 8px;
  color: #333;
`,D=p.a.div`
  font-size: 18px;
  color: #1a1a1b;
  margin-bottom: 10px;
`,F=(p.a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #d3d6da;
`,p.a.div`
  display: flex;
  Justrify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
`),M=p.a.div`
  display: flex;
  gap: 24px;
  width: 100%;
  padding: 0;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 1024px) {
      flex-direction: column;
      align-items: center;
  }
`,W=p.a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,Y=p.a.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`,H=p.a.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 320px;
`,B=(p.a.h3`
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8e8e8;
  color: #333;
`,p.a.div`
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
`),J=p.a.div`
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
  color: #1a1a1a;
`,A=p.a.div`
    background: #f0f0f0;
    color: #333;
    padding: 8px 16px;
    border-radius: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
`;p.a.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 6rem;
  font-weight: bold;
  color: #0066cc;
  animation: pulse 1s infinite;

  @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
  }
`,p.a.div`
    animation: ${e=>e.isRevealed?"flipIn 0.5s ease-out forwards":"none"};
    animation-delay: ${e=>e.delay}s;
    opacity: ${e=>e.isRevealed?1:0};
    transform: rotateY(90deg);
    
    @keyframes flipIn {
        from { transform: rotateY(90deg); opacity: 0; }
        to { transform: rotateY(0deg); opacity: 1; }
    }
`;var q=()=>{const{setGameClient:e}=Object(o.useContext)(h),t=Object(c.r)(),[r,a]=Object(o.useState)(""),n=(()=>{const[e,t]=Object(o.useState)(0);return Object(o.useEffect)((()=>{const e=async()=>{try{const e=await fetch("https://two4pointsgameonline-backend.onrender.com/game/players/count");if(!e.ok)throw console.error("Server response:",e.status,e.statusText),new Error(`HTTP error! status: ${e.status}`);const r=await e.json();t(r)}catch(e){throw console.error("Error fetching online player number:",e),e}};e(),console.log("useOnlinePlayerCount: Fetching online player count");const r=setInterval(e,100);return()=>clearInterval(r)}),[]),e})();return Object(m.jsxs)(b,{children:[Object(m.jsxs)(N,{children:[Object(m.jsx)(P,{}),Object(m.jsxs)(E,{children:["Online: ",n]})]}),Object(m.jsx)(x,{children:"24"}),Object(m.jsx)(g,{children:"Combine Numbers to Hit 24"}),Object(m.jsxs)(j,{children:[Object(m.jsx)(f,{children:"Welcome to the Game"}),Object(m.jsxs)(y,{onSubmit:async o=>{if(o.preventDefault(),!r.trim())return void alert("Player name cannot be empty");const a=new d(r);try{await a.addPlayer(r),e(a),console.log("LoginPage Player: ",a.getPlayerName()),t("/mode-selection")}catch(n){n instanceof Error?alert(n.message):(console.error("Unexpected error:",n),alert("Unexpected error"))}},children:[Object(m.jsxs)(O,{children:[Object(m.jsx)(w,{children:"Enter Your Name"}),Object(m.jsx)(L,{value:r,onChange:e=>a(e.target.value),placeholder:"Your player name",required:!0})]}),Object(m.jsx)(v,{type:"submit",children:"Start Playing!"})]}),Object(m.jsxs)(k,{children:[Object(m.jsx)(_,{children:"How to Play:"}),Object(m.jsxs)(S,{children:[Object(m.jsx)(C,{children:"\u2022 Use all four numbers exactly once"}),Object(m.jsx)(C,{children:"\u2022 Use basic operations (+, -, \xd7, \xf7) and parentheses"}),Object(m.jsx)(C,{children:"\u2022 Make the result equal to 24"}),Object(m.jsx)(C,{children:"\u2022 Play solo or challenge other players"})]})]})]})]})};const Q=e=>{Object(o.useEffect)((()=>{const t=t=>{e&&e.exitGame()};return window.addEventListener("beforeunload",t),()=>window.removeEventListener("beforeunload",t)}),[e])},K=p.a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`,V=p.a.h2`
  font-size: 32px;
  color: #1a1a1b;
  margin-bottom: 30px;
`,X=p.a.button`
  width: 200px;
  padding: 20px;
  margin: 10px;
  font-size: 18px;
  font-weight: bold;
  background: white;
  border: 2px solid #d3d6da;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f4f4f4;
    transform: translateY(-2px);
  }
`,Z=p.a.p`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;var ee=()=>{const e=Object(c.r)(),t=Object(c.p)();console.log("Location state: ",t.state);const{client:r}=Object(o.useContext)(h);return Q(r),Object(m.jsxs)(K,{children:[Object(m.jsx)(V,{children:"Select Game Mode"}),Object(m.jsxs)("div",{children:[Object(m.jsxs)(X,{onClick:()=>(async()=>{if(console.log("ModeSelection Player: ",null===r||void 0===r?void 0:r.getPlayerName()),!r)return;const t=await r.createRoom("1");await r.joinGame(t),e("/game/single",{state:{mode:"single"}})})(),children:["Single Player",Object(m.jsx)(Z,{children:"Practice by yourself"})]}),Object(m.jsxs)(X,{onClick:()=>(console.log("ModeSelection Player: ",null===r||void 0===r?void 0:r.getPlayerName()),void e("/rooms",{state:{mode:"multi"}})),children:["Multiplayer",Object(m.jsx)(Z,{children:"Compete with other players"})]})]})]})};const te=p.a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`,re=p.a.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,oe=p.a.div`
  padding: 15px;
  border: 1px solid #d3d6da;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    background: #f4f4f4;
  }
`,ae=p.a.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #6aaa64;
  color: white;
  cursor: pointer;
  
  &:hover {
    background: #5c935c;
  }
`;var ne=()=>{const e=Object(c.r)(),[t,r]=Object(o.useState)([]),{client:a}=Object(o.useContext)(h);Object(o.useEffect)((()=>{let e;return a&&(e=setInterval((async()=>{const e=await a.fetchRooms();"Empty"!==e.status?(console.log("RoomList: ",e.status),console.log("RoomListLength: ",e.roomList.length),r(e.roomList)):r([])}),1e3)),()=>clearInterval(e)}),[a]);return Q(a),Object(m.jsxs)(te,{children:[Object(m.jsx)("h1",{children:"Game Rooms"}),Object(m.jsx)(ae,{onClick:()=>(async t=>{if(a)try{const r=await a.createRoom(t);await a.joinGame(r),e(`/game/multi/${r}`,{state:{mode:"multi"}})}catch(r){console.error("Error creating room:",r)}})("8"),children:"Create New Room"}),Object(m.jsx)(re,{children:0===t.length?Object(m.jsx)("p",{children:"No rooms available"}):t.map((t=>Object(m.jsxs)(oe,{children:[Object(m.jsxs)("div",{children:[Object(m.jsxs)("h3",{children:["Room ",t.roomID]}),Object(m.jsxs)("p",{children:["Host: ",t.hostPlayer]}),Object(m.jsxs)("p",{children:["Available Seats: ",t.vacancySeats]})]}),Object(m.jsx)(ae,{onClick:()=>(async t=>{if(a)try{await a.joinGame(t),e(`/game/multi/${t}`)}catch(r){console.error("Error joining room:",r)}})(t.roomID),children:"Join Room"})]},t.roomID)))})]})};const ie=()=>{const e=Object(c.r)(),{client:t}=Object(o.useContext)(h),[r,a]=Object(o.useState)((null===t||void 0===t?void 0:t.getPlayerName())||""),[n,i]=Object(o.useState)((null===t||void 0===t?void 0:t.getCurrentPlayerFormula())||""),[s,l]=Object(o.useState)((null===t||void 0===t?void 0:t.getCurrentPlayerResult())||"0+default"),[d,m]=Object(o.useState)((null===t||void 0===t?void 0:t.getCurrentPlayerError())||"default error"),[u,p]=Object(o.useState)({}),[b,x]=Object(o.useState)((null===t||void 0===t?void 0:t.getGameNumbersString())||[]),[g,j]=Object(o.useState)([]),[f,y]=Object(o.useState)([]),[O,w]=Object(o.useState)(""),[v,k]=Object(o.useState)(""),[_,S]=Object(o.useState)(0),[C,N]=Object(o.useState)(!1),[P,E]=Object(o.useState)(3),T=e=>{i(e.getCurrentPlayerFormula()),m(e.getCurrentPlayerError()),l(e.getCurrentPlayerResult()+e.getCurrentPlayerError()),x(e.getGameNumbersString()),p(e.getOtherPlayers()),w(e.getWinner()),k(e.getWinnerFormula())};return Object(o.useEffect)((()=>{let e;return C&&P>1?e=setTimeout((()=>E((e=>e-1))),1e3):1===P&&(e=setTimeout((()=>{N(!1),E(3)}),1e3)),()=>clearTimeout(e)}),[P,C]),Object(o.useEffect)((()=>{let e;return C||O||(e=setInterval((()=>{S((e=>e+.01))}),10)),()=>clearInterval(e)})),{client:t,playerName:r,formula:n,result:s,error:d,otherPlayers:u,gameNumbers:b,usedButtonIndices:g,winner:O,winnerFormula:v,gameTime:_,isCountingDown:C,count:P,updateDisplay:T,handleTokenClick:async e=>{if(t)try{await t.addToken(e),T(t),y((e=>[...e,-1]))}catch(d){console.error("Error:",d)}},handleNumberTokenClick:async(e,r)=>{if(t)try{await t.addToken(e),T(t),j((e=>[...e,r])),y((e=>[...e,r]))}catch(d){console.error("Error:",d)}},handleRemove:async()=>{if(t)try{await t.removeToken(),T(t),y((e=>{if(0===e.length)return e;const t=e.slice(0,-1),r=e[e.length-1];return r>-1&&j((e=>e.filter((e=>e!==r)))),t}))}catch(d){console.error("Error:",d)}},handleClear:async()=>{if(t)try{await t.clearFormula(),T(t),j([]),y([])}catch(d){console.error("Error:",d)}},handleNewGame:async()=>{if(t)try{await t.startNewGame(),T(t),j([]),y([])}catch(d){console.error("Error:",d)}},handleLogout:async()=>{if(t)try{await t.exitGame(),t.resetClient(),e("/mode-selection")}catch(d){console.error("Error:",d)}}}},se=p.a.button`
  width: 60px;
  height: 60px;
  border: 2px solid #d3d6da;
  border-radius: 4px;
  font-size: 24px;
  font-weight: bold;
  background: white;
  color: #1a1a1b;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f4f4f4;
  }
`,ce=p.a.button`
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  background: #818384;
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #6e6e6e;
  }
`,le=p.a.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  background: #6aaa64;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  transition: all 0.2s;

  &:hover {
    background: #5c935c;
  }
`,de=p.a.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  justify-items: center;
  margin-bottom: 5px;
`,me=p.a.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  justify-items: center;
  margin-bottom: 10px;
`,he=Object(p.a)(le)`
  background: #dc3545;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  padding: 8px 16px;

  &:hover {
    background: #c82333;
  }
`,ue=p.a.div`
  display: flex;
  gap: 8px;
  margin: 15px 0;
  justify-content: center;

  ${le} {
    flex: 1;
    max-width: 120px;  // Prevent buttons from getting too wide
  }
`;var pe=()=>{const{client:e,playerName:t,formula:r,result:o,gameNumbers:a,winner:n,winnerFormula:i,gameTime:s,isCountingDown:l,count:d,handleTokenClick:h,handleRemove:u,handleClear:p,handleNewGame:b,handleLogout:x}=ie();Object(c.r)();return Q(e),Object(m.jsx)(T,{children:Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)(G,{children:[Object(m.jsx)(R,{children:"24 Game - Singleplayer"}),Object(m.jsxs)(D,{children:["Player: ",t]}),Object(m.jsx)(A,{children:s}),Object(m.jsx)(he,{onClick:x,children:"Quit Game"})]}),n&&Object(m.jsxs)(U,{children:[Object(m.jsx)("h2",{children:"Game Solved!"}),Object(m.jsxs)("div",{children:["Winner: ",n]}),Object(m.jsxs)(z,{children:["Winning Solution: ",i]}),Object(m.jsxs)("div",{children:["Time: ",s]})]}),Object(m.jsx)(F,{children:Object(m.jsxs)(W,{children:[Object(m.jsx)(de,{children:l?Object(m.jsx)("div",{className:"absolute inset-0 flex items-center justify-center",children:Object(m.jsx)("div",{className:"text-4xl font-bold",children:d})}):a.map(((e,t)=>Object(m.jsx)(se,{onClick:()=>h(e),children:e},t)))}),Object(m.jsx)(I,{children:r||"Start building your formula"}),Object(m.jsxs)($,{children:["Result: ",o]}),Object(m.jsx)(me,{children:["+","-","*","/","(",")"].map((e=>Object(m.jsx)(ce,{onClick:()=>h(e),children:e},e)))}),Object(m.jsxs)(ue,{children:[Object(m.jsx)(le,{onClick:p,children:"Clear"}),Object(m.jsx)(le,{onClick:u,children:"Undo"}),Object(m.jsx)(le,{onClick:b,children:"New Game"})]})]})})]})})};var be=()=>{Object(c.r)();const{client:e,playerName:t,formula:r,result:a,error:n,otherPlayers:i,gameNumbers:s,usedButtonIndices:l,winner:d,winnerFormula:h,updateDisplay:u,handleTokenClick:p,handleNumberTokenClick:b,handleRemove:x,handleClear:g,handleNewGame:j,handleLogout:f}=ie(),[y,O]=Object(o.useState)(!1),[w,v]=Object(o.useState)(!1),[k,_]=Object(o.useState)(3),[S,C]=Object(o.useState)(0),[N,P]=Object(o.useState)([!1,!1,!1,!1]);return Object(o.useEffect)((()=>{let e;return y&&!d&&(e=setInterval((()=>{C((e=>e+1))}),1e3)),()=>clearInterval(e)}),[y,d]),Object(o.useEffect)((()=>{let t;const r=async()=>{if(e)try{await e.fetchGamePage(),u(e)}catch(n){console.error("Error fetching game state:",n)}};return e&&(r(),t=setInterval(r,100)),()=>{t&&clearInterval(t)}}),[e]),Object(o.useEffect)((()=>{let e;return w&&k>0?e=setTimeout((()=>_(k-1)),1e3):w&&0===k&&(e=setTimeout((()=>{let e=0;const t=[];for(let r=0;r<4;r++){const o=setTimeout((()=>{P((e=>{const t=[...e];return t[r]=!0,t})),3===r&&setTimeout((()=>{v(!1),_(3),P([!1,!1,!1,!1]),O(!0)}),500)}),e);t.push(o),e+=400}return()=>{t.forEach(clearTimeout)}}),1e3)),()=>clearTimeout(e)}),[w,k]),Q(e),Object(m.jsxs)(T,{children:[Object(m.jsxs)(G,{children:[Object(m.jsx)(R,{children:"24 Game - Multiplayer"}),Object(m.jsxs)(D,{children:["Player: ",t]}),Object(m.jsx)(A,{children:S}),Object(m.jsx)(he,{onClick:f,children:"Quit Game"})]}),d&&Object(m.jsxs)(U,{children:[Object(m.jsx)("h2",{children:"Game Solved!"}),Object(m.jsxs)("div",{children:["Winner: ",d]}),Object(m.jsxs)(z,{children:["Solution: ",h]}),Object(m.jsxs)("div",{children:["Time: ",S]})]}),Object(m.jsxs)(M,{children:[Object(m.jsx)(Y,{children:w?Object(m.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"2rem",fontWeight:"bold",height:"300px"},children:k}):Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(de,{children:s.map(((e,t)=>Object(m.jsx)(se,{onClick:()=>b(e,t),disabled:l.includes(t),style:{backgroundColor:l.includes(t)?"#e0e0e0":"white",color:l.includes(t)?"#999":"#333",cursor:l.includes(t)?"not-allowed":"pointer"},children:e},t)))}),Object(m.jsx)(I,{children:r||"Start building your formula"}),Object(m.jsxs)($,{children:["Result: ",a]}),Object(m.jsx)(me,{children:["+","-","*","/","(",")"].map((e=>Object(m.jsx)(ce,{onClick:()=>p(e),children:e},e)))}),Object(m.jsxs)(ue,{children:[Object(m.jsx)(le,{onClick:g,children:"Clear"}),Object(m.jsx)(le,{onClick:x,children:"Undo"}),Object(m.jsx)(le,{onClick:j,children:"New Game"})]})]})}),Object(m.jsxs)(H,{children:[Object(m.jsx)("h3",{style:{marginTop:0,marginBottom:"12px"},children:"Other Players"}),Object.entries(i).filter((e=>{let[r]=e;return r!==t})).length>0?Object.entries(i).filter((e=>{let[r]=e;return r!==t})).map((e=>{let[t,r]=e;return Object(m.jsxs)(B,{children:[Object(m.jsx)(J,{children:t}),Object(m.jsx)(I,{children:r.formula||"No formula yet"}),Object(m.jsxs)($,{children:["Result: ",r.value||"0"]})]},t)})):Object(m.jsx)(B,{children:Object(m.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:"No other players in this Room"})})]})]})]})};var xe=()=>{const{client:e}=Object(o.useContext)(h);return e?Object(m.jsx)(c.b,{}):Object(m.jsx)(c.a,{to:"/",replace:!0})};var ge=function(){return Object(m.jsx)(s.a,{children:Object(m.jsx)(u,{children:Object(m.jsxs)(c.e,{children:[Object(m.jsx)(c.c,{path:"/",element:Object(m.jsx)(q,{})}),Object(m.jsxs)(c.c,{element:Object(m.jsx)(xe,{}),children:[Object(m.jsx)(c.c,{path:"/mode-selection",element:Object(m.jsx)(ee,{})}),Object(m.jsx)(c.c,{path:"/rooms",element:Object(m.jsx)(ne,{})}),Object(m.jsx)(c.c,{path:"/game/single",element:Object(m.jsx)(pe,{})}),Object(m.jsx)(c.c,{path:"/game/multi/:roomId",element:Object(m.jsx)(be,{})})]})]})})})};var je=e=>{e&&e instanceof Function&&r.e(3).then(r.bind(null,24)).then((t=>{let{getCLS:r,getFID:o,getFCP:a,getLCP:n,getTTFB:i}=t;r(e),o(e),a(e),n(e),i(e)}))};i.a.createRoot(document.getElementById("root")).render(Object(m.jsx)(a.a.StrictMode,{children:Object(m.jsx)(ge,{})})),je()}},[[23,1,2]]]);
//# sourceMappingURL=main.c75a7d53.chunk.js.map