import API from '@/lib/axios';
import { setCollections } from '@/redux/collectionSlice'
import store from '@/redux/store';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllCollections = () => {
    const { collections }=useSelector(store => store.collections);
    // if(collections)
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCollections = async () => {
            try {
                const res = await API.get("/collections",{withCredentials:true});
                if(res.data.success){                    
                    dispatch(setCollections(res.data.data));
                    console.log(collections);
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchCollections();
    },[])
}

export default useGetAllCollections