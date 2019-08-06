import React from 'react';
//import {withRouter} from 'react-router-dom'; <button onClick={()=>history.push(`/${id}`)}/>
import './collection-item.styles.scss';

const CollectionItem = ({id,name,imageUrl,price}) =>(
    <div className="collection-item">
        <div className= "image" style={{backgroundImage: `url(${imageUrl})`}}/>
        <div className="collection-footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>    
    </div>
);

//export default withRouter(CollectionItem);
export default CollectionItem;