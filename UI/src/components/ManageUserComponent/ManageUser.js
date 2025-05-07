import './ManageUser.css';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {__userapiurl} from '../../Apiurl';

function ManageUser() {
  const navigate=useNavigate()
   const [userDetail,setUserDetail]=useState([]);
  
    useEffect(()=>{

      axios.get(__userapiurl+"fetch?role=user").then((response)=>{
        setUserDetail(response.data);

      }).catch((error)=>{
        console.log(error);
      })

    })
    const changStatus =(_id,s)=>{
      if(s=='verify')
      {
          let updateDetails={"condition_obj":{"_id":_id},"content_obj":{"status":1}}; 
          axios.patch(__userapiurl+"update",updateDetails).then((response)=>{
            alert("user verify successfully");
            navigate("/manageuser");
          }).catch((err)=>{
              console.log(err);
          })
     
      }
      else if(s=='block')
      {
          let updateDetails={"condition_obj":{"_id":_id},"content_obj":{"status":0}}; 
          axios.patch(__userapiurl+"update",updateDetails).then((response)=>{
            alert("user block successfully");
              navigate("/manageuser");
          }).catch((err)=>{
              console.log(err);
          })
      }
      else
      {
          let deleteDetails={"data":{"_id":_id}}; 
      axios.delete(__userapiurl+"delete",deleteDetails).then((response)=>{
          navigate("/manageuser");
      }).catch((err)=>{
          console.log(err);
      })
      }
  }

   return (
  <> 


    {/* About Start */}
    <div class="container-fluid overflow-hidden py-5 px-lg-0">
        <div class="container about py-5 px-lg-0">
            <div class="row g-5 mx-lg-0">
                <div class="col-lg-12 about-text wow fadeInUp" data-wow-delay="0.3s">
                <h1>Manage user Details here!!!!!</h1>
                <table class="table table-bordered" border={2}>
                   <tr>
                     <th>Regid</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Mobile</th>
                     <th>Address</th>
                     <th>City</th>
                     <th>Info</th>
                     <th>role</th>
                     <th>status</th>
                     <th>Action</th>
                   </tr>
                   {
                    userDetail.map((row)=>(
                        <tr>
                          <td>{row._id}</td>
                          <td>{row.name}</td>
                          <td>{row.email}</td>
                          <td>{row.mobile}</td>
                          <td>{row.address}</td>
                          <td>{row.city}</td>
                          <td>{row.info}</td>
                          <td>{row.role}</td>
                          <td>
                            {
                               row.status==0 && <a style= {{"color":"green"}} onClick={()=>{changStatus(row._id,'verify')}}>verify user</a>
                            }
                            {
                               row.status==1 && <a style= {{"color":"orange"}} onClick={()=>{changStatus(row._id,'block')}}>Block user</a>
                            }
                          </td>
                            <td>
                                <a style= {{"color":"red"}}  onClick={()=>{changStatus(row._id,'delete')}}>Delete user</a>   
                          </td>

                        </tr>
                    ))
                   }
                </table>
              </div>
            </div>
        </div>
    </div>
    {/* About End */}

   
  </>  
  );
}

export default ManageUser;
