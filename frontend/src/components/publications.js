import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Publications.css'

const Publications = () => {
    const [publications, setPublications]=useState([])
    const nameRef = React.useRef();

	const updatepage=() =>{
		axios.get("http://localhost:3001/publication")
        .then(response => setPublications(response.data)
		
		)
        .catch(error => console.log(error.response))
	}

     useEffect(() => {
        {updatepage()}
    },[])

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

	const sharePosts = () => {
		const originalPub = [...publications];
		console.log("afiichage :" +publications);
		console.log('name:', nameRef.current.value);
        const creatPost ={
            userId : 1,
            content: nameRef.current.value,
            imgUrl: "imgPublication6696.jpg"
          }

		
		  setPublications(currentPublication => [
			  ...currentPublication,
			  {
				  ...creatPost,
				  user: {
					  id: 1,
					  firstName: "haifa",
					  lastName: "mokhtar",
					  imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJVH0h1OwJsUSQVr-yAC0L9MzciamkLT1jPh1yDJVJMMbGG4z86qgTeKywIPNGZCAuGw0&usqp=CAU"
				  }
			  }
		  ])

			console.log(creatPost)
	        axios.post("http://localhost:3001/publication",  creatPost)
	      .then(res => {
			nameRef.current.value=""
	        console.log(res.data);
	      })
		  .catch(error => {
	        console.log(error.response);
	    })
  }


//     const sharePosts = () => {
//     console.log('name:', nameRef.current.value);
//         const creatPost ={
//             userId : 1,
//             content: nameRef.current.value,
//             imgUrl: ""
//           }
// 				console.log(creatPost)
// 	        axios.post("http://localhost:3001/publication",  creatPost )
// 	      .then(res => {
// 			{updatepage()}
// 	        console.log(res.data);
// 	      }).catch(error => {
// 	        console.log(error.response);
// 	    })
//   }


    


    return (
        <div class="container-fluid my-5">
		<div class="row">
			<div class="col-3">
			</div>
			<div class="col-6">

                <section class="card">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Make
                                    a Post</a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div class="form-group">
                                    <textarea id="name" ref={nameRef} class="form-control"  rows="3" placeholder="What are you thinking..." > </textarea>
                                </div>

                            </div>
                        </div>
                        <div >
                            <span class="text-start"><button type="button" class="btn btn-primary" onClick={() => sharePosts()} >share</button></span>
                            <span class="text-end"><input type="file"/></span>
                        </div>
                    </div>
                </section>
				<section class="mt-4">
				
                    {publications.map(pub=> <div class="fb-cards-designs">
                    <div className="fb-clone-card">
                        <div className="fb-card-main-content">
                            <div className="fb-card-header">
                                <div className="user-post-info">
                                    <div className="user-thumb">
                                        <img src={pub.user.imgUrl} className="img-responsive"  alt="test"/>
                                    </div>
                                    <div className="user-information">
                                        <p>{pub.user.firstName} {pub.user.lastName} </p>
                                        <small>{pub.createdAt}</small>
                                    </div>
                                </div>
                                <div className="post-action">
                                <div class="dropdown">
									<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
										...
									</button>
									<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
										<li><a class="dropdown-item" onClick={() => handelDelete(pub.id)}>Supprimer</a></li>
										<li><a class="dropdown-item" href="#">Modifier</a></li>
										<li><a class="dropdown-item" href="#">Something else here</a></li>
									</ul>
									</div>   
                                </div>
                            </div>
                
                            <div className="fb-card-body simple-text-card">
                                <p>{pub.content}</p>
                                <img src={pub.imgUrl} className="img-responsive imgPublication"alt="test" />
                            </div>
                
                        </div>
                        <div className="fb-card-like-comment-holder">
                            <div className="fb-card-like-comment">
                                
                            </div>
                        </div>
                        <div className="fb-card-actions-holder">
                            <div className="fb-card-actions">
                                <div className="fb-btn-holder">
                                   <a href="/#"><i className="far fa-thumbs-up"></i> J'aime </a> 
                                </div>
                                <div className="fb-btn-holder">
                                    <a href="/#"><i className="far fa-comment-alt"></i> Commenter</a>
                                </div>
                            </div>
                        </div>
                        <div className="fb-card-comments">
                            <div className="comment-input-holder">
                                <div className="user-thumb">
                                    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" className="img-responsive" alt="test"/>
                                </div>
                                <div>
                                    <input type='text' placeholder='écrire un commentaire' className="comment-input"/>
                                </div>
                            </div>
                        </div>
                        {pub.comments?.map(comment=>
                        <div className="fb-card-comments">
                            <div className="comment-input-holder">
                                <div className="user-thumb">
                                    <img src={comment.user.imgUrl} className="img-responsive" alt="test"/>
                                </div>
                                <div>
                                    <p className="text-left">{comment.content} </p> 
                                </div>
                            </div>
                        </div>
                        )}

                    </div>
                    </div>
                )}
                
				</section>
			</div>
			<div class="col-3">
			</div>
		</div>
	</div>
    )}
  
  export default Publications