import React,{useState} from 'react';
import './listcomponent.css';
import ListCard from './ListCard';
import { useDispatch,useSelector } from 'react-redux';
import {screenActions} from '../features/screenReducer';


const ListComponent = ({formScreen,startCard}) =>{
    const dispatch = useDispatch();

    const category = useSelector(state => state.category);
    const musicList = useSelector(state => state.musicList);
    const moviesList = useSelector(state => state.moviesList);
    const booksList = useSelector(state => state.booksList);

    
    const [mySearch, setMySearch] = useState('');
    const [sorteringNyckel,setSorteringNyckel] = useState('');

    let h2 = '', titleText = '', creatorText = '', search = [],
    usedBeforeText = '' , addButtonText = '' , list =[];
    let colorClass = '';
    

    switch(category){
        case 'music':
            h2 = 'Music';
            titleText = 'Song Title';
            creatorText = 'Artist';
            usedBeforeText = 'Listened to';
            addButtonText = 'Add music';
            colorClass = 'red';
            list = musicList; 
        break;
        case 'books':
            h2 = 'Books';
            titleText = 'Book Title';
            creatorText = 'Author';
            usedBeforeText = 'Read before';
            addButtonText = 'Add book';
            colorClass = 'yellow';
            list = booksList; 
        break;
        case 'movies':
            h2 = 'Movies';
            titleText = 'Movie Title';
            creatorText = 'Director';
            usedBeforeText = 'Seen';
            addButtonText = 'Add movie';
            colorClass = 'green';
            list = moviesList; 
        break;
        default:
            h2 = 'Movies';
            titleText = 'Movie Title';
            creatorText = 'Director';
            usedBeforeText = 'Seen';
            addButtonText = 'Add movie';
            colorClass = 'green';
            list = moviesList; 
			break;
    }

    
    

    if (mySearch !==''){
        search =[...list].filter(item=>
            (item.title).toLowerCase().includes(mySearch.toLowerCase())||
            (item.creator).toLowerCase().includes(mySearch.toLowerCase())||
            (item.comment).toLowerCase().includes(mySearch.toLowerCase()) ||
            (item.usedBefore).toLowerCase().includes(mySearch.toLowerCase()) ||
            (item.rating).includes(mySearch.toLowerCase())
        );
    }else {
        search = [...list];
    }

    
    if(sorteringNyckel ==='title'){

        let sorterade = search.sort((a,b)=>{
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            else if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            else return 0;
        })
        search = sorterade;
    }else if (sorteringNyckel === 'usedBefore') {

        let sorterade = search.sort((a,b)=>{
            if (a.usedBefore.toLowerCase() > b.usedBefore.toLowerCase()) return -1;
            else if (a.usedBefore.toLowerCase() < b.usedBefore.toLowerCase()) return 1;
            else return 0;
        })
        search = sorterade;
    }else if (sorteringNyckel === 'creator') {

        let sorterade = search.sort((a,b)=>{
            if (a.creator.toLowerCase() < b.creator.toLowerCase()) return -1;
            else if (a.creator.toLowerCase() > b.creator.toLowerCase()) return 1;
            else return 0;
        })
        search = sorterade;
    } else if(sorteringNyckel === 'rating'){
        
        let sorterade = search.sort((a,b)=>{
            if (Number(a.rating) > Number(b.rating)) return -1;
            else if (Number(a.rating) < Number(b.rating)) return 1;
            else return 0;
        })
        search = sorterade;
    }
    

    
    
    if(list.length === 0){
        list= <h1>No item in the list...</h1>
    }else{
        list = search.map((item, index)=><ListCard key={item.title+index} title={item.title} creator={item.creator} usedBefore={item.usedBefore} rating={item.rating} comment={item.comment} />)
    }


    
    
    const handleFormScreen = () => {
        dispatch(screenActions.formScreen());
    }
    

    return(
        
            <main className={`text-${colorClass} background-${colorClass}`}>               
                <h2>{h2}</h2>
                <div className='listcomponent-menu'>
                    <div className={`sort background-${colorClass}`}>
                        <h2 className={`drop-div text-${colorClass} `}>Sort</h2>
                        <div className={`dropdown-content text-${colorClass} background-${colorClass}`}>

                            <div className={sorteringNyckel!=='title' ? `sortItem-${colorClass}`  : `sortChosed-${colorClass}`} onClick={()=>{setSorteringNyckel('title')}}>{titleText}</div>

                            <div className={sorteringNyckel!=='creator' ? `sortItem-${colorClass}`  : `sortChosed-${colorClass}`} onClick={()=>{setSorteringNyckel('creator')}}>{creatorText}</div>

                            <div className={sorteringNyckel!=='rating' ? `sortItem-${colorClass}`  : `sortChosed-${colorClass}`} onClick={()=>{setSorteringNyckel('rating')}}>Rating</div>

                            <div className={sorteringNyckel!=='usedBefore' ? `sortItem-${colorClass}`  : `sortChosed-${colorClass}`} onClick={()=>{setSorteringNyckel('usedBefore')}}>{usedBeforeText}</div>
                        </div>
                    
                    </div> 
                    <div>
                        <input className={colorClass} type="text" value={mySearch} onChange = {(event)=>setMySearch(event.target.value)} placeholder="Search"></input>
                    </div>
                
                </div>
                <div className=" main scrollable">

                    {list}
            
                </div>
                <div className='add-button'>
                    <button className={`addButton-${colorClass}`} onClick={handleFormScreen}>{addButtonText}</button>
                </div>
            </main>
    );
}
export default ListComponent;


