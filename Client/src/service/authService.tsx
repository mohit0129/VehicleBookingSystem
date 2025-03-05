import { useRiderStore } from "@/store/riderStore";
import { tokenStorage } from "@/store/storage";
import { useUserStore } from "@/store/userStore";
import { resetAndNavigate } from "@/utils/Helpers";
import { Alert } from "react-native";
import { BASE_URL } from "./config";
import axios from "axios";

export const signin = async (payload: {
    role: 'customer' | 'rider',
    phone: String
},
updateAccessToken: () => void
) => {
    const { setUser } = useUserStore.getState()
    const { setUser: setRiderUser } = useRiderStore.getState();

    try {
        const res = await axios.post(`${BASE_URL}/auth/signin`, payload);
        if (res.data.user.role === 'customer') {
            setUser(res.data.user)
        } else {
            setRiderUser(res.data.user)
        }

        tokenStorage.set("access_token", res.data.access_token);
        tokenStorage.set("refresh_token", res.data.refresh_token);

        if (res.data.user.role === 'customer') {
            resetAndNavigate('/customer/home')
        }
        else {
            resetAndNavigate('/rider/home')
        }
        updateAccessToken()
    } catch (error: any) {
        Alert.alert("Oh no, there was an error");
        console.log("Error: ", error?.response?.data?.msg || "Error signin");
    }
}

export const logout = async (disconnect?: () => void ) => {

    if(disconnect){
        disconnect();
    }

    const { clearData } = useUserStore.getState();
    const { clearRiderData } = useRiderStore.getState();

    tokenStorage.clearAll();
    clearRiderData();
    clearData();
    resetAndNavigate('/role');
};

// import { useRiderStore } from "@/store/riderStore";
// import { tokenStorage } from "@/store/storage";
// import { useUserStore } from "@/store/userStore";
// import { resetAndNavigate } from "@/utils/Helpers";
// import { Alert } from "react-native";
// import { BASE_URL } from "./config";
// import axios from "axios";

// export const signin = async (
    
//     payload: {
//         role: "customer" | "rider";
//         phone: string;
//     },
//     updateAccessToken: () => void
// ) => {
//     const { setUser } = useUserStore.getState();
//     const { setUser: setRiderUser } = useRiderStore.getState();

//     try {
//         const res = await axios.post(`${BASE_URL}/auth/signin`, payload);
//         if (res.data.user.role === "customer") {
//             setUser(res.data.user);
//         } else {
//             setRiderUser(res.data.user);
//         }

//         await tokenStorage.setItem("access_token", res.data.access_token);
//         await tokenStorage.setItem("refresh_token", res.data.refresh_token);

//         if (res.data.user.role === "customer") {
//             resetAndNavigate("/customer/home");
//         } else {
//             resetAndNavigate("/rider/home");
//         }
//         updateAccessToken();
//     } catch (error: any) {
//         Alert.alert("Oh! Dang there was an error in auth service");
//         console.log("Error: ", error?.response?.data?.msg || "Error signin");
//     }
// };

// export const logout = async (disconnect?: () => void) => {
//     if (disconnect) {
//         disconnect();
//     }

//     const { clearData } = useUserStore.getState();
//     const { clearRiderData } = useRiderStore.getState();

//     await tokenStorage.removeItem("access_token");
//     await tokenStorage.removeItem("refresh_token");
//     clearRiderData();
//     clearData();
//     resetAndNavigate("/role");
// };
