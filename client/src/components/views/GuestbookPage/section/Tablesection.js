import React, {useState, useEffect} from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow, Button} from '@material-ui/core'
import styled from 'styled-components';
import { useDispatch, useSelector  } from 'react-redux';
import { deleteGuestBook, loadGuestBook } from '../../../../actions/GuestbookAction';
import Loading from '../../LoadingPage/Loading';

const Nick = styled(TableCell)`
    width : 15%;
    text-align : center;
`;

const Content = styled(TableCell)`
    width : 70%;
    text-align : center;

`;

const Time = styled(TableCell)`
    width : 15%;
    text-align : center;

`;
const Delete = styled(TableCell)`
    width : auto;
    $:hover {
        display : inline;
    }
`;
const TableArea = styled.div`
    margin-bottom : 20px;
`;
    
    // //useSelector의 값은 reducer에서의 return 값을 갖는다. 비구조화할당을 할경우 각각의 변수가
    // // state의 뭔 값을 의미하는지 정해주어야 한다. 
    // const {addGuestbook, delGuestbook} = useSelector(state => ({
    //     addGuestbook : state.GuestbookReducer.addGuestbook,
    //     delGuestbook : state.GuestbookReducer.delGuestbook
    // }));
function Tablesection({ page }) {
    const [load, setLoad] = useState(false);
    const [guest, setGuest] = useState([]);
    const guestbookLength = useSelector(state => state.GuestbookReducer.guestlength);
    const dispatch = useDispatch();
    useEffect(() => {
        setLoad(true);
        dispatch(loadGuestBook())
        .then(res => {
            //page.id에 따라 slice 하기 시작 : (page.id-1)*10, 끝 : page.id*10 - 1
            // slice는 끝이 undefined이면 배열 길이만큼만 리턴
            setGuest(res.data.slice((page.id-1)*10, page.id*10 -1));
            setLoad(false);
        })
    }, [dispatch, guestbookLength, page.id])

    const onClickDelete = (id) => {
        const data = { data : {id} };
        dispatch(deleteGuestBook(data))
    }
    return (
        <TableArea>
            {load ? 
            <Loading />
            :
                <Table>
                    <TableHead>
                        <TableRow>
                            <Nick>닉네임</Nick>
                            <Content>내용</Content>
                            <Time colSpan="2">작성일</Time>
                        </TableRow>    
                    </TableHead>
                    <TableBody>
                            {guest.map((val, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <Nick>{val.writer.nick}</Nick>
                                        <Content>{val.text}</Content>
                                        <Time>{val.date}</Time>
                                        <Delete><Button onClick={() => onClickDelete(val._id)}>X</Button> </Delete>
                                    </TableRow>
                                ) 
                            })}
                    </TableBody>
                </Table>
            }  
       </TableArea>
    )
}

export default Tablesection
