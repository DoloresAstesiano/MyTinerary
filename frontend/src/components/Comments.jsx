import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import commentsActions from '../redux/actions/commentsActions'
import { useState } from 'react';


export default function Comments({ eachItinerary, reload, setReload }) {
    console.log(eachItinerary)
    const user = useSelector(store => store.usersReducer.user)
    console.log(user)
    const [text, setText] = useState("")
    const [modify, setModify] = useState("")
    const dispatch = useDispatch()

    async function addComment() {
        const comment = {
            itinerary: eachItinerary._id,
            comment: text
        }
        const res = await dispatch(commentsActions.addComment(comment))
        // console.log(res)
        setText("")
        setReload(!reload)
        document.querySelector("#newComment").textContent = ""
    }

    async function modifyComment(comment) {
        // console.log(comment)
        const commentData = {
            comment: modify
        }
        const commentID = comment._id
        const res = await dispatch(commentsActions.modifyComment(commentID, commentData))
        setReload(!reload)
    };

    async function removeComment(comment) {
        const commentID = comment._id
        const res = await dispatch(commentsActions.removeComment(commentID))
        setReload(!reload)
    }
    return (
        <div className='containerComents'>
            <div>
                <p className='titleComments'>COMMENTS</p>

                {eachItinerary.comments?.map(comment =>
                    <div key={comment._id}>
                        {console.log(comment)}
                        {comment.userId._id !== user?.id ?
                        
                            <div className="containerInput">
                                {comment.comment}
                            </div>
                            :
                            <>   
                            <div className='container_input_infoUser'>
                            <div className='bnm'> 
                                <div className='container_infoUser'>
                                    <img className='img_comment' src={comment.userId.photoUser} alt={comment.nameUser} />
                                    <div>
                                        <p>{comment.userId.nameUser}</p>
                                    </div>
                                </div>
                               
                                <div className="containerInput" contentEditable onInput={(event) =>
                                    setModify(event.currentTarget.textContent)} suppressContentEditableWarning={true}>
                                    {comment.comment}
                                </div>
                                </div>
                                <div className='container_button_comments'>
                                    <button className="button_card" onClick={() => modifyComment(comment)}>Modify</button>
                                    <button className="button_card" onClick={() => removeComment(comment)}>Delete</button>
                                </div>
                            </div>
                       
                            </>
                        }
                    </div>
                )
                }
                {user ?
                    <>
                        <div className="containerInput" id="newComment" contentEditable value={text} onInput={(event) =>
                            setText(event.currentTarget.textContent)}
                            suppressContentEditableWarning={true}>
                        </div>
                        <button className="button_card" onClick={addComment}>Add</button>
                    </>
                    :
                    <div className='txt_coment_like'>
                        <p><b>Register to be able to like and leave comments</b></p>
                    </div>
                }
            </div>
        </div >
    )
}