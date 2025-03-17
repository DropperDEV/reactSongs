

export function handleAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
  
    if (accessToken) {
      localStorage.setItem("genius_token", accessToken);
      window.location.href = "/"; 
    }
  }
  