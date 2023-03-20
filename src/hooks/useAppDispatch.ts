import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"

const useAppDispatch = () =>{
    return useDispatch<AppDispatch>()
}

export default useAppDispatch
