const publicVapidKey = "BMf_9maerv-SRY2ES8nL8PkDROZt1chj_HSQ2orVRDcr8SMqNW350WAyXU5EWS6fl5mLUc1dPmKG7ftrrihgDt8";

if("serviceWorker" in navigator){
    send().catch(err => console.log(err));
}

async function send(){
    console.log("registering SW");
    const register = await navigator.serviceWorker.register(
        "/sw.js"
    );
    console.log("service worker registered......");

    console.log("registering push........");
    const subscription = await register.pushManager.subscribe({userVisibleOnly:true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("push Registered....");

    console.log("sending push............");
    await fetch('/subscribe', {
        method: 'POST',
        body:JSON.stringify(subscription),
        headers:{
            'content-type': 'application/json'
        }
    });
    console.log('Push snet......');

    function urlBase64ToUint8Array(base64String){
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/-/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i){
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}