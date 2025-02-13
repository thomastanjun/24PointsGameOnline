(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{21:function(e,t,r){},23:function(e,t,r){"use strict";r.r(t);var o=r(0),a=r.n(o),n=r(11),i=r.n(n),s=(r(21),r(7)),c=r(3);let l=function(e){return e.SINGLE="SINGLE",e.MULTI="MULTI",e}({});var d=class{constructor(e){this._baseURL=void 0,this._playerName=void 0,this._cells=void 0,this._gameNumbers=void 0,this._gameStatus=void 0,this._roomID=void 0,this._gameMode=void 0,this._rooms=void 0,this._baseURL="http://localhost:8080/game",this._playerName=e,this._cells={},this._gameNumbers=[],this._gameStatus={gameStatus:"false",winner:"",winnerFormula:""},this._roomID=null,this._gameMode=null,console.log("GameClient initialized with player:",e),this._rooms={}}async getOnlinePlayerNumber(){try{const e=await fetch("${this._baseURL/players/count}");if(!e.ok)throw console.error("Server response:",e.status,e.statusText),new Error(`HTTP error! status: ${e.status}`);return e.json()}catch(e){throw console.error("Error fetching online player number:",e),e}}async verifyPlayerName(){try{const e=await fetch(`${this._baseURL}/player/${this._playerName}`);if(!e.ok){if(409===e.status){const t=await e.json();throw new Error(t.message)}throw new Error("Unexpected error: "+e.status)}}catch(e){throw console.error("Player Already logged in:",e),e}}async createRoom(e){try{console.log("creating game");const t=await fetch(`${this._baseURL}/room/${e}`,{method:"POST"}),r=await t.text();return this._roomID=r,console.log("GameClient roomID",r),this._gameMode=l.SINGLE,r}catch(t){throw console.error("Error creating room:",t),t}}async fetchRooms(){try{const e=await fetch(`${this._baseURL}/rooms/available`);if(!e.ok)throw console.error("Server response:",e.status,e.statusText),new Error(`HTTP error! status: ${e.status}`);return await e.json()}catch(e){throw console.error("Error fetching rooms:",e),e}}async joinGame(e){try{const t=await fetch(`${this._baseURL}/room/${e}/add/player/${this._playerName}`,{method:"PUT"});if(!t.ok){const e=await t.json();throw new Error(e.message)}this._roomID=e;const r=await t.json();this._updateGameState(r)}catch(t){throw console.error("Error joining game:",t),t}}async leaveGame(){try{const e=await fetch(`${this._baseURL}/room/${this._roomID}/remove/player/${this._playerName}`,{method:"DELETE"});if(this._roomID=null,!e.ok){const t=await e.json();throw new Error(t.message)}}catch(e){throw console.error("Error quitting game:",e),e}}async addToken(e){try{const t=await fetch(`${this._baseURL}/room/${this._roomID}/add/token/${this._playerName}`,{method:"PUT",headers:{"Content-Type":"text/plain"},body:e}),r=await t.json();this._updateGameState(r)}catch(t){throw console.error("Error adding token:",t),t}}async removeToken(){try{const e=await fetch(`${this._baseURL}/room/${this._roomID}/remove/token/${this._playerName}`,{method:"PUT"}),t=await e.json();this._updateGameState(t),console.log("reveived data after remove",t)}catch(e){throw console.error("Error removing token:",e),e}}async clearFormula(){try{const e=await fetch(`${this._baseURL}/room/${this._roomID}/clear/formula/${this._playerName}`,{method:"PUT"}),t=await e.json();this._updateGameState(t),console.log("reveived data after clear",t)}catch(e){throw console.error("Error clearing formula:",e),e}}async startNewGame(){try{const e=await fetch(`${this._baseURL}/room/${this._roomID}/newgame/game1`,{method:"PUT"}),t=await e.json();this._updateGameState(t)}catch(e){throw console.error("Error starting new game:",e),e}}async fetchGamePage(){try{const e=await fetch(`${this._baseURL}/room/${this._roomID}/state`),t=await e.json();console.log("fetch",e),this._updateGameState(t)}catch(e){throw console.error("Error fetching game state:",e),e}}setRoomID(e){this._roomID=e}getCurrentPlayerFormula(){var e;return(null===(e=this._cells[this._playerName])||void 0===e?void 0:e.formula)||""}getCurrentPlayerResult(){var e;return(null===(e=this._cells[this._playerName])||void 0===e?void 0:e.value)||"0"}getCurrentPlayerError(){var e;return(null===(e=this._cells[this._playerName])||void 0===e?void 0:e.value)||""}getGameNumbersString(){return this._gameNumbers}isGameFinished(){return"true"===this._gameStatus.gameStatus}getWinner(){return this._gameStatus.winner}getWinnerFormula(){return this._gameStatus.winnerFormula}getGameStatus(){return this._gameStatus.gameStatus}getPlayerName(){return this._playerName}_updateGameState(e){this._cells=e.players,this._gameNumbers=e.gameNumbers,this._gameStatus=e.gameStatus}resetClient(){this._cells={},this._gameNumbers=[],this._gameStatus={gameStatus:"false",winner:"",winnerFormula:""},this._roomID=null,this._gameMode=null}},m=r(1);const h=Object(o.createContext)({client:null,setGameClient:()=>{}}),u=e=>{let{children:t}=e;const[r,a]=Object(o.useState)(null);return Object(m.jsx)(h.Provider,{value:{client:r,setGameClient:a},children:t})};var b=r(4);const p=b.a.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    padding: 20px;
`,x=b.a.h1`
    font-size: 4rem;
    color: #fff;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`,g=b.a.p`
    font-size: 1.2rem;
    color: #e2e8f0;
    margin-bottom: 2rem;
`,j=b.a.div`
    background: rgba(255, 255, 255, 0.95);
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
`,f=b.a.h2`
    text-align: center;
    color: #2d3748;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
`,y=b.a.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`,O=b.a.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`,v=b.a.label`
    color: #4a5568;
    font-size: 0.9rem;
`,w=(b.a.input`
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #4299e1;
    }
`,b.a.button`
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
`),_=b.a.div`
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
`,S=b.a.h3`
    color: #2d3748;
    font-size: 1.2rem;
    margin-bottom: 1rem;
`,k=b.a.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`,C=b.a.p`
    color: #4a5568;
    font-size: 0.9rem;
`,P=b.a.div`
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
`,N=b.a.div`
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
`,E=b.a.span`
    color: #1f2937;
    font-weight: 500;
`,G=b.a.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`,I=b.a.header`
  text-align: center;
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #d3d6da;
`,R=b.a.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  color: #1a1a1b;
`,T=(b.a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`,b.a.div`
  width: 100%;
  padding: 15px;
  margin: 20px 0;
  border: 2px solid #d3d6da;
  border-radius: 4px;
  font-size: 20px;
  text-align: center;
  background: #f6f7f8;
`),$=b.a.div`
  font-size: 24px;
  font-weight: bold;
  color: #1a1a1b;
  text-align: center;
`,L=b.a.input`
  padding: 10px;
  width: 200px;
  border: 2px solid #d3d6da;
  border-radius: 4px;
  font-size: 16px;
`,U=b.a.div`
  background: #6aaa64;
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,F=b.a.div`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
`,z=b.a.div`
  font-size: 18px;
  color: #1a1a1b;
  margin-bottom: 10px;
`,D=(b.a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #d3d6da;
`,b.a.div`
  display: flex;
  Justrify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
`),M=b.a.div`
  display: grid;
  grid-template-columns: 1fr 1fr;  
  gap: 20px;
  margin-top: 20px;
`,W=b.a.div`
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
`,Y=b.a.div`
  padding: 20px;
  border-right: 2px solid #d3d6da;
`,H=b.a.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,J=b.a.div`
  padding: 15px;
  border: 1px solid #d3d6da;
  border-radius: 8px;
  background: #f8f9fa;
`,q=b.a.div`
  font-size: 18px;
  font-weight: bold;
  color: #1a1a1b;
  margin-bottom: 10px;
`;var A=()=>{const{setGameClient:e}=Object(o.useContext)(h),t=Object(c.p)(),[r,a]=Object(o.useState)(""),n=(()=>{const[e,t]=Object(o.useState)(0);return Object(o.useEffect)((()=>{const e=async()=>{try{const e=await fetch("http://localhost:8080/game/players/count");if(!e.ok)throw console.error("Server response:",e.status,e.statusText),new Error(`HTTP error! status: ${e.status}`);const r=await e.json();t(r)}catch(e){throw console.error("Error fetching online player number:",e),e}};e(),console.log("useOnlinePlayerCount: Fetching online player count");const r=setInterval(e,100);return()=>clearInterval(r)}),[]),e})();return Object(m.jsxs)(p,{children:[Object(m.jsxs)(P,{children:[Object(m.jsx)(N,{}),Object(m.jsxs)(E,{children:["Online: ",n]})]}),Object(m.jsx)(x,{children:"24!"}),Object(m.jsx)(g,{children:"Combine Numbers and Operators Strategically to Hit 24!"}),Object(m.jsxs)(j,{children:[Object(m.jsx)(f,{children:"Welcome to the Game"}),Object(m.jsxs)(y,{onSubmit:async o=>{if(o.preventDefault(),!r.trim())return void alert("Player name cannot be empty");const a=new d(r);try{await a.verifyPlayerName(),e(a),console.log("LoginPage Player: ",a.getPlayerName()),t("/mode-selection")}catch(n){n instanceof Error?alert(n.message):(console.error("Unexpected error:",n),alert("Unexpected error"))}},children:[Object(m.jsxs)(O,{children:[Object(m.jsx)(v,{children:"Enter Your Name"}),Object(m.jsx)(L,{value:r,onChange:e=>a(e.target.value),placeholder:"Your game name",required:!0})]}),Object(m.jsx)(w,{type:"submit",children:"Start Playing!"})]}),Object(m.jsxs)(_,{children:[Object(m.jsx)(S,{children:"How to Play:"}),Object(m.jsxs)(k,{children:[Object(m.jsx)(C,{children:"\u2022 Use all four numbers exactly once"}),Object(m.jsx)(C,{children:"\u2022 Use basic operations (+, -, \xd7, \xf7)"}),Object(m.jsx)(C,{children:"\u2022 Make the result equal to 24"})]})]})]})]})};const B=b.a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`,Q=b.a.h2`
  font-size: 32px;
  color: #1a1a1b;
  margin-bottom: 30px;
`,K=b.a.button`
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
`,V=b.a.p`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;var X=()=>{const e=Object(c.p)(),t=Object(c.n)();console.log("Location state: ",t.state);const{client:r}=Object(o.useContext)(h);return Object(m.jsxs)(B,{children:[Object(m.jsx)(Q,{children:"Select Game Mode"}),Object(m.jsxs)("div",{children:[Object(m.jsxs)(K,{onClick:()=>(async()=>{if(console.log("ModeSelection Player: ",null===r||void 0===r?void 0:r.getPlayerName()),!r)return;const t=await r.createRoom("1");await r.joinGame(t),e("/game/single",{state:{mode:"single"}})})(),children:["Single Player",Object(m.jsx)(V,{children:"Practice by yourself"})]}),Object(m.jsxs)(K,{onClick:()=>(console.log("ModeSelection Player: ",null===r||void 0===r?void 0:r.getPlayerName()),void e("/rooms",{state:{mode:"single"}})),children:["Multiplayer",Object(m.jsx)(V,{children:"Compete with other players"})]})]})]})};const Z=b.a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`,ee=b.a.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,te=b.a.div`
  padding: 15px;
  border: 1px solid #d3d6da;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    background: #f4f4f4;
  }
`,re=b.a.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #6aaa64;
  color: white;
  cursor: pointer;
  
  &:hover {
    background: #5c935c;
  }
`;var oe=()=>{const e=Object(c.p)(),[t,r]=Object(o.useState)([]),{client:a}=Object(o.useContext)(h);Object(o.useEffect)((()=>{let e;return a&&(e=setInterval((async()=>{const e=await a.fetchRooms();"Empty"!==e.status?(console.log("RoomList: ",e.status),console.log("RoomListLength: ",e.roomList.length),r(e.roomList)):r([])}),1e3)),()=>clearInterval(e)}),[a]);return Object(m.jsxs)(Z,{children:[Object(m.jsx)("h1",{children:"Game Rooms"}),Object(m.jsx)(re,{onClick:()=>(async t=>{if(a)try{const r=await a.createRoom(t);await a.joinGame(r),e("/game/single",{state:{mode:"single"}})}catch(r){console.error("Error creating room:",r)}})("4"),children:"Create New Room"}),Object(m.jsx)(ee,{children:0===t.length?Object(m.jsx)("p",{children:"No rooms available"}):t.map((t=>Object(m.jsxs)(te,{children:[Object(m.jsxs)("div",{children:[Object(m.jsxs)("h3",{children:["Room ",t.roomID]}),Object(m.jsxs)("p",{children:["Host: ",t.hostPlayer]}),Object(m.jsxs)("p",{children:["Available Seats: ",t.vacancySeats]})]}),Object(m.jsx)(re,{onClick:()=>(async t=>{if(a)try{await a.joinGame(t),e(`/game/multi/${t}`)}catch(r){console.error("Error joining room:",r)}})(t.roomID),children:"Join Room"})]},t.roomID)))})]})};const ae=b.a.button`
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
`,ne=b.a.button`
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
`,ie=b.a.button`
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
`,se=b.a.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`,ce=b.a.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`,le=Object(b.a)(ie)`
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
`,de=b.a.div`
  display: flex;
  gap: 8px;
  margin: 15px 0;
  justify-content: center;

  ${ie} {
    flex: 1;
    max-width: 120px;  // Prevent buttons from getting too wide
  }
`;var me=()=>{const e=Object(c.p)(),{client:t}=Object(o.useContext)(h);console.log("a new render");const[r,a]=Object(o.useState)((null===t||void 0===t?void 0:t.getPlayerName())||""),[n,i]=Object(o.useState)((null===t||void 0===t?void 0:t.getCurrentPlayerFormula())||""),[s,l]=Object(o.useState)((null===t||void 0===t?void 0:t.getCurrentPlayerResult())||"0"),[d,u]=Object(o.useState)((null===t||void 0===t?void 0:t.getGameNumbersString())||[]),[b,p]=Object(o.useState)(""),[x,g]=Object(o.useState)(""),[j,f]=Object(o.useState)("false"),[y,O]=Object(o.useState)(!1),[v,w]=Object(o.useState)(3),_=e=>{i(e.getCurrentPlayerFormula()),l(e.getCurrentPlayerResult()),u(e.getGameNumbersString()),f(e.getGameStatus()),e.getWinner()&&(p(e.getWinner()),g(e.getWinnerFormula()))};Object(o.useEffect)((()=>{let e;return y&&v>1?e=setTimeout((()=>w((e=>e-1))),1e3):1===v&&(e=setTimeout((()=>{O(!1),w(3)}),1e3)),()=>clearTimeout(e)}),[v,y]);const S=()=>{a(""),i(""),l("0"),u([]),p(""),g("")},k=async e=>{if(t)try{await t.addToken(e),_(t)}catch(r){console.error("Error:",r)}};return Object(m.jsx)(G,{children:Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)(I,{children:[Object(m.jsx)(R,{children:"24 Game"}),Object(m.jsxs)(z,{children:["Player: ",r]}),Object(m.jsx)(le,{onClick:async()=>{if(t)try{await t.leaveGame(),S(),t.resetClient(),e("/mode-selection")}catch(r){console.error("Error:",r)}},children:"Quit Game"})]}),b&&Object(m.jsxs)(U,{children:[Object(m.jsx)("h2",{children:"You Solved It!"}),Object(m.jsxs)("div",{children:["Player: ",b]}),Object(m.jsxs)(F,{children:["Winning Formula: ",x]})]}),Object(m.jsx)(D,{children:Object(m.jsxs)(W,{children:[Object(m.jsx)(se,{children:y?Object(m.jsx)("div",{className:"absolute inset-0 flex items-center justify-center",children:Object(m.jsx)("div",{className:"text-4xl font-bold",children:v})}):d.map(((e,t)=>Object(m.jsx)(ae,{onClick:()=>k(e),children:e},t)))}),Object(m.jsx)(T,{children:n||"Start building your formula"}),Object(m.jsxs)($,{children:["Result: ",s]}),Object(m.jsx)(ce,{children:["+","-","*","/","(",")"].map((e=>Object(m.jsx)(ne,{onClick:()=>k(e),children:e},e)))}),Object(m.jsxs)(de,{children:[Object(m.jsx)(ie,{onClick:async()=>{if(t)try{await t.clearFormula(),_(t)}catch(e){console.error("Error:",e)}},children:"Clear"}),Object(m.jsx)(ie,{onClick:async()=>{if(t)try{await t.removeToken(),_(t)}catch(e){console.error("Error:",e)}},children:"Undo"}),Object(m.jsx)(ie,{onClick:async()=>{if(t)try{O(!0),await t.startNewGame(),p(""),g(""),_(t)}catch(e){console.error("Error:",e)}},children:"New Game"})]})]})})]})})};var he=()=>{const e=Object(c.p)(),{client:t}=Object(o.useContext)(h);console.log("a new render");const[r,a]=Object(o.useState)((null===t||void 0===t?void 0:t.getPlayerName())||""),[n,i]=Object(o.useState)((null===t||void 0===t?void 0:t.getCurrentPlayerFormula())||""),[s,l]=Object(o.useState)((null===t||void 0===t?void 0:t.getCurrentPlayerResult())||"0"),[d,u]=Object(o.useState)((null===t||void 0===t?void 0:t.getGameNumbersString())||[]),[b,p]=Object(o.useState)(""),[x,g]=Object(o.useState)(""),[j,f]=Object(o.useState)("false"),y=e=>{i(e.getCurrentPlayerFormula()),l(e.getCurrentPlayerResult()),u(e.getGameNumbersString()),f(e.getGameStatus()),e.getWinner()&&(p(e.getWinner()),g(e.getWinnerFormula()))},O=()=>{a(""),i(""),l("0"),u([]),p(""),g("")},v=async e=>{if(t)try{await t.addToken(e),y(t)}catch(r){console.error("Error:",r)}};return Object(m.jsx)(G,{children:Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)(I,{children:[Object(m.jsx)(R,{children:"24 Game"}),Object(m.jsxs)(z,{children:["Player: ",r]}),Object(m.jsx)(le,{onClick:async()=>{if(t)try{await t.leaveGame(),O(),t.resetClient(),e("/mode-selection")}catch(r){console.error("Error:",r)}},children:"Quit Game"})]}),b&&Object(m.jsxs)(U,{children:[Object(m.jsx)("h2",{children:"You Solved It!"}),Object(m.jsxs)("div",{children:["Player: ",b]}),Object(m.jsxs)(F,{children:["Winning Formula: ",x]})]}),Object(m.jsxs)(M,{children:[Object(m.jsxs)(Y,{children:[Object(m.jsx)(se,{children:d.map(((e,t)=>Object(m.jsx)(ae,{onClick:()=>v(e),children:e},t)))}),Object(m.jsx)(T,{children:n||"Start building your formula"}),Object(m.jsxs)($,{children:["Result: ",s]}),Object(m.jsx)(ce,{children:["+","-","*","/","(",")"].map((e=>Object(m.jsx)(ne,{onClick:()=>v(e),children:e},e)))}),Object(m.jsxs)(de,{children:[Object(m.jsx)(ie,{onClick:async()=>{if(t)try{await t.clearFormula(),y(t)}catch(e){console.error("Error:",e)}},children:"Clear"}),Object(m.jsx)(ie,{onClick:async()=>{if(t)try{await t.removeToken(),y(t)}catch(e){console.error("Error:",e)}},children:"Undo"}),Object(m.jsx)(ie,{onClick:async()=>{if(t)try{await t.startNewGame(),p(""),g(""),y(t)}catch(e){console.error("Error:",e)}},children:"New Game"})]})]}),Object(m.jsx)(H,{children:t&&Object.entries(t._cells).filter((e=>{let[t]=e;return t!==r})).map((e=>{let[t,r]=e;return Object(m.jsxs)(J,{children:[Object(m.jsx)(q,{children:t}),Object(m.jsx)(T,{children:r.formula||"No formula yet"}),Object(m.jsxs)($,{children:["Result: ",r.value||"0"]})]},t)}))})]})]})})};var ue=function(){return Object(m.jsx)(s.a,{children:Object(m.jsx)(u,{children:Object(m.jsxs)(c.c,{children:[Object(m.jsx)(c.a,{path:"/",element:Object(m.jsx)(A,{})}),Object(m.jsx)(c.a,{path:"/mode-selection",element:Object(m.jsx)(X,{})}),Object(m.jsx)(c.a,{path:"/rooms",element:Object(m.jsx)(oe,{})}),Object(m.jsx)(c.a,{path:"/game/single",element:Object(m.jsx)(me,{})}),Object(m.jsx)(c.a,{path:"/game/multi/:roomId",element:Object(m.jsx)(he,{})})]})})})};var be=e=>{e&&e instanceof Function&&r.e(3).then(r.bind(null,24)).then((t=>{let{getCLS:r,getFID:o,getFCP:a,getLCP:n,getTTFB:i}=t;r(e),o(e),a(e),n(e),i(e)}))};i.a.createRoot(document.getElementById("root")).render(Object(m.jsx)(a.a.StrictMode,{children:Object(m.jsx)(ue,{})})),be()}},[[23,1,2]]]);
//# sourceMappingURL=main.8b33536a.chunk.js.map