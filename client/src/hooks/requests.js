const URL = 'http://localhost:8000';

async function httpGetPlanets() {
  const response = await fetch(`${URL}/planets`);
  return response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a,b) => {
    return a.flightNumber - b.flightNumber
  });
}

async function httpSubmitLaunch(launch) {
  try{
    return await fetch(`${URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  }catch(err){
    return{
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try{
    await fetch(`${URL}/launches/${id}`, {
      method: "delete",
    });
  }catch(err){
    console.log(err);
    return{
      ok: false,
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};