

export default  function UserProfile({params}: any) {    
    

    return (
        <div className="bg-black  flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl text-white py-4">Profile</h1>
            <hr />
            <p className="text-4xl text-white ">Profile Page {": "}  

                <span className="p-2 bg-orange-600 rounded">{`${params.id}`}</span>
                
            </p>
            
        </div>
    );
}
