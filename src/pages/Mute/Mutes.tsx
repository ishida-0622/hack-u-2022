/** @jsxImportSource @emotion/react */
import Default from "components/template/Default/Default";
import useUserData from "hooks/useUserData";
import { useEffect, useState } from "react";

const MuteList = () => {
    const [userData] = useUserData();
    const [mutetags, setMuteTags] = useState<string[]>([])
    useEffect(()=>{
        if(!userData){
            return;
        }
        setMuteTags(userData.mutes);
    },[userData])

    function mutes_button(){
        let mute_button = document.getElementById('mutes-button');

        if(!mute_button){
            return;
        }

        if(mute_button?.innerHTML==='ミュート中'){
            mute_button.innerHTML='ミュート';
        }else{
            mute_button.innerHTML='ミュート中';
        }
    }

    return (
        <Default>
            {mutetags.map(v=><div> <p key={v}>{v} <button id='mutes-button' onClick={mutes_button}>ミュート中</button></p></div>)}
        </Default>
    );
};

export default MuteList;
