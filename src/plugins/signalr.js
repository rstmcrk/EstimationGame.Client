import { HubConnectionBuilder } from "@microsoft/signalr";
import { ref } from "vue";
import store from '../store/index';

const isConnected = ref(false);
const isConnecting = ref(false);

const hubConnection = new HubConnectionBuilder()
    .withUrl("https://storypointpoker-dev.azurewebsites.net/estimationHub") 
    .withAutomaticReconnect([0,1000,2000,5000,10000,30000])
    .build();

hubConnection.start()
    .then(() => {
        isConnected.value = true;    
        const userConnectionId = store.getters.getUserConnectionId;
        const group = store.getters.getGroup;
        
        if(userConnectionId != null && group != null){
            hubConnection.invoke("UpdateConnectionId", group.groupName, userConnectionId)
            .then(() => hubConnection.invoke('GetUserToGroup', group.groupName))
                .catch(err => console.error("Error updating connection ID:", err));
        }
    })
    .catch(() => {
        isConnected.value = false;
    });

hubConnection.onreconnecting((err) => {
    isConnecting.value = true;
    console.log(err)
});

hubConnection.onreconnected((err) =>{
    isConnected.value = true;
    isConnecting.value = false;
    console.log(err)
});

hubConnection.onclose((err) => {
    isConnected.value = false;
    isConnecting.value = false;
    console.log(err)
});

export { isConnected,isConnecting,hubConnection }; 