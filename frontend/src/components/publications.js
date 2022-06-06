import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Publications.css'

const Publications = () => {
    
    //Récuperation de user id du local storage 
    const userId = JSON.parse(localStorage.getItem('userId')) ;
    
    // Déclation des variables d'etat
    const [publications, setPublications]=useState([])
    const [content, setContent] = useState('');
    const [imgUrl, setimgUrl] = useState(null);

    const [comment, setComments]=useState([])

    const [contentedit, setContentedit] = useState('');
    const [imgUrledit, setimgUrledit] = useState(null);

    // initlaisation des useref
    const commentRef = React.useRef();
    const contentRef = React.useRef();
    const imgRef = React.useRef();
    const idpubRef = React.useRef();
    const imgurlRef = React.useRef();
    const contentShare = React.useRef();
    const inptfile = React.useRef();

    // fonction d'affichage des publications
	const updatepage=() =>{
		axios.get("http://localhost:3001/publication")
        .then(response => setPublications(response.data)
		)
        .catch(error => console.log(error.response))
	}
     useEffect(() => {
        {updatepage()}
    },[])
    
    // Fonction de création de publication
	const sharePosts = () => {
        const formData = new FormData();
        formData.append('content', content);
        imgUrl && formData.append('image', imgUrl);
        formData.append('userId', userId);
        if(content.length != 0 || imgUrl){
            axios
        .post("http://localhost:3001/publication", formData)
        .then(res => {
            updatepage()
            contentShare.current.value=""
            inptfile.current.value=""
            setContent("")
	      })
		  .catch(error => {
	        console.log(error);
	    })
        }
        else{
            alert("vide")
        }

    }

    // Modification du publication
    const getpubEdit = (pub) => {
        axios.get("http://localhost:3001/publication/" + pub)
        .then(response => {
            imgurlRef.current.value=response.data.imgUrl;
            imgRef.current.src=response.data.imgUrl;
            contentRef.current.value=response.data.content;
            idpubRef.current.value=pub
        })
        .catch(error => console.log(error.response))
    }

    const updateposts = () => {

        const idpub=idpubRef.current.value;
        
            let formDataedit = new FormData();
            formDataedit.append('content', contentRef.current.value);
            formDataedit.append('userId', userId);
            formDataedit.append('image', imgUrledit);
        
            let coms={
                "userId":userId,
                "imgPath":imgurlRef.current.value,
                "content":contentRef.current.value
            }
        
        

        axios
        .put("http://localhost:3001/publication/"+idpub, imgUrledit !=null ? formDataedit : coms )
        .then(res => {
            {updatepage()}
            

            console.log(res);
        })
        .catch(error => {
            console.log(error);
        })

    }   

    //  supperssion de publication
    const handelDelete = (id) => {

        // creer une copie de tableaux des publications si il ya une erreur la publication sera recupérer
        const originalPub = [...publications];

        // approche opptimiste
        setPublications(publications.filter(publication => publication.id !== id))

        // approche pessimiste
        axios
        .delete("http://localhost:3001/publication/" +id)
        .then(response => console.log("ok"))
        .catch(error => {
            setPublications(originalPub);
            console.log(error.response);
        })
	}


    // Ecrire un commentaire
    const shareCom = (pub) => {
        const comments={
            "userId":userId,
            "publicationId":pub,
            "content":comment
        }
        console.log(comments)
        axios
        .post("http://localhost:3001/comment", comments)
        .then(res => {
            
            {updatepage()};
            commentRef.current.value="";
            setComments("")
            
	      })
		  .catch(error => {
	        console.log(error);
	    })

    }

    // fonction de suppression des commentaires
    const deleteCommentaires = (id,countPub) => {
        // Supprimer commentaires
        const originalPub = [...publications];
        const commentaires = originalPub[countPub].comments;

    // approche opptimiste
    setComments(originalPub[countPub].comments.filter(commentaire => commentaire.id !== id))

    // approche pessimiste
    axios
    .delete("http://localhost:3001/comment/" +id)
    .then(response => {{updatepage()};
            setComments("")
    })
    .catch(error => {
        
        console.log(error.response);
    })
    }
    const deleteUser = (pubuser) => {
        axios
        .delete("http://localhost:3001/user/"+pubuser)
        .then(response => {
            console.log("supprimer!")
            {updatepage()}
        })
        .catch(error => {
            console.log(error.response);
        })
    }
    

    return (
    <div className="container-fluid my-5">
		    <div className="row">
			    <div className="col-3">
			    </div>
			    <div className="col col-md-12 col-lg-6">
                <section className="card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Make
                                    a Post</a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div className="form-group">
                                    <textarea id="name" ref={contentShare} className="form-control"  rows="3"  onChange={(e) => setContent(e.target.value)}> </textarea>
                                </div>

                            </div>
                        </div>
                        <div>
                            <span className="text-start"><button type="button" className="btn btn-primary" onClick={() => sharePosts()} >share</button></span>
                            <span className="text-end"><input type="file" ref={inptfile} onChange={(e) => setimgUrl(e.target.files[0])} /></span>
                        </div>
                    </div>
                </section>
				<section className="mt-4">
				
                    {publications.map((pub,i)=> 

                    <div key={i} className="fb-cards-designs">
                        <div className="fb-clone-card">
                            <div className="fb-card-main-content">
                                <div className="fb-card-header">
                                    <div className="user-post-info">
                                        <div className="user-thumb">
                                            {pub.user.imgUrl ? (
                                                <img src={pub.user.imgUrl} className="img-responsive"  alt="test2"/>
                                            ):
                                            (<img src="https://lesexpertsdurecouvrement.com/wp-content/uploads/2015/11/default-avatar.jpg"className="img-responsive"  alt="test2"/>)
                                            }
                                            
                                        </div>
                                        <div className="user-information">
                                            <p>{pub.user.firstName} {pub.user.lastName} </p>
                                            <small>{pub.createdAt}</small>
                                        </div>
                                    </div>
                                    <div className="post-action">
                                    {pub.user.id === userId || userId === 28 ? (
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            ...
                                        </button>
                                        
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a className="dropdown-item" onClick={() => handelDelete(pub.id)}>Supprimer</a></li>
                                            <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=> getpubEdit(pub.id)}>Modifier</a></li>
                                            
                                        </ul>
                                    </div>  ):(<></>)} 
                                    
                                    </div>
                                    {userId === 28 ? (<button type="button" className=" btn btn-primary"onClick={() => deleteUser(pub.user.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                    </svg></button>):(<></>)}
                                </div>
                    
                                <div className="fb-card-body simple-text-card">
                                    <p>{pub.content}</p>
                                    {pub.imgUrl ? (<img src={pub.imgUrl} className="img-responsive imgPublication" alt="test1" />):
                                    (<></>)
                                    }
                                    
                                </div>
                    
                            </div>
                            <div className="fb-card-like-comment-holder">
                                <div className="fb-card-like-comment">
                                </div>
                            </div>
                            <div className="fb-card-actions-holder">
                                <div className="fb-card-actions">
                                    <div className="fb-btn-holder">
                                        <a href="/#"><i className="far fa-comment-alt"></i> Commenter</a>
                                    </div>
                                </div>
                            </div>
                            <div key={i} className="fb-card-comments">
                                <div className="comment-input-holder">
                                    

                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text blockimg" >

                                            {pub.user.imgUrl ? (
                                                <img src={pub.user.imgUrl} className="img-responsive imgStyle"  alt="test2" />
                                            ):
                                            (<img src="https://lesexpertsdurecouvrement.com/wp-content/uploads/2015/11/default-avatar.jpg"className="img-responsive imgStyle"  alt="test2"/>)
                                            }
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" ref={commentRef} onChange={(e) => setComments(e.target.value)} placeholder='écrire un commentaire' />
                                        <div className="input-group-append">
                                            <span className="input-group-text blockIcon" onClick={() => shareCom(pub.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                            </svg>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                        </div>
                        
                        {pub.comments?.map((comment,j)=>
                        <div key={j} className="fb-card-comments">
                            <div className="comment-input-holder">
                                <div className="user-thumb">
                                {comment.user.imgUrl ? (
                                                <img src={comment.user.imgUrl} className="img-responsive"  alt="test2"/>
                                            ):
                                            (<img src="https://lesexpertsdurecouvrement.com/wp-content/uploads/2015/11/default-avatar.jpg"className="img-responsive"  alt="test2"/>)
                                            }
                                    
                                </div>
                                <p className="user-comment"> {comment.user.firstName} {comment.user.lastName}</p>
                                <div>
                                {comment.user.id === userId || userId === 28 ? (    
                                    <a className='trash' onClick={() => deleteCommentaires(comment.id,i)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </a>):(<></>)}
                                    <p className=" comment-text text-start">{comment.content} </p> 
                                    

                                </div>
                            </div>
                                
                        </div>
                        )}
                    
                        </div>
                    </div>
                    )}
                
				</section>
                
                </div>
                <div className="col-3">
			    </div>
            
		    </div>

        {/* // modal de modification de publication */}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit posts</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <input type="hidden" ref={idpubRef}></input>
                        <input type="hidden" ref={imgurlRef}></input>
                        <div className="modal-body">
                            <textarea id="name" ref={contentRef} className="form-control"  rows="3"  onChange={(e) => setContentedit(e.target.value)}> </textarea>
                            <input type="file" onChange={(e) => setimgUrledit(e.target.files[0])} />
                            <img src=''ref={imgRef}className="img-responsive imgPublication"/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"onClick={() => updateposts()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
	</div>
                    

    )
}
  
  export default Publications