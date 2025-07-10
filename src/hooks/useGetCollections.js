import API from '@/lib/axios';
import { setCollections } from '@/redux/collectionSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllCollections = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCollections = async () => {
            try {
                const res = await API.get("/collections",{withCredentials:true});
                if(res.data.success){
                    dispatch(setCollections(res.data.data));
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchCollections();
    },[])
}

export default useGetAllCollections