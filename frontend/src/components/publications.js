import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Publications.css'

const Publications = () => {
    const [publications, setPublications]=useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/publication")
        .then(response => setPublications(response.data))
    },[])
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    {publications.map(pub=> <div class="fb-cards-designs">
                    <div class="fb-clone-card">
                        <div class="fb-card-main-content">
                            <div class="fb-card-header">
                                <div class="user-post-info">
                                    <div class="user-thumb">
                                        <img src={pub.user.imgUrl} class="img-responsive"  alt="test"/>
                                    </div>
                                    <div class="user-information">
                                        <p>{pub.user.firstName} {pub.user.lastName} </p>
                                        <small>1 hr</small>
                                    </div>
                                </div>
                                <div class="post-action">
                                    <i class="fas fa-ellipsis-h"></i>
                                </div>
                            </div>
                
                            <div class="fb-card-body simple-text-card">
                                <p>{pub.content}</p>
                                <img src={pub.imgUrl} class="img-responsive imgPublication"alt="test" />
                            </div>
                
                        </div>
                        <div class="fb-card-like-comment-holder">
                            <div class="fb-card-like-comment">
                                
                            </div>
                        </div>
                        <div class="fb-card-actions-holder">
                            <div class="fb-card-actions">
                                <div class="fb-btn-holder">
                                    <a href="/#"><i class="far fa-thumbs-up"></i> J'aime</a>
                                </div>
                                <div class="fb-btn-holder">
                                    <a href="/#"><i class="far fa-comment-alt"></i> Commenter</a>
                                </div>
                            </div>
                        </div>
                        <div class="fb-card-comments">
                            <div class="comment-input-holder">
                                <div class="user-thumb">
                                    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" class="img-responsive" alt="test"/>
                                </div>
                                <div class="comment-input">
                                    <div class="comment-box" placeholder="Ecrire un commentaire..." ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    )}
                </div>  
                <div className='col-md-3'></div>  
            </div>
        </div>
    )}
  
  export default Publications