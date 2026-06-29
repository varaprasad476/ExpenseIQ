import { useAuth } from "../context/AuthContext";

function Profile() {
    const { user } = useAuth();

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-4xl font-bold">
                    👤 My Profile
                </h1>

                <p className="text-gray-500">
                    Manage your account information.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">

                <div className="flex items-center gap-6">

                    <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>

                        <h2 className="text-3xl font-bold">
                            {user?.name}
                        </h2>

                        <p className="text-gray-500 mt-2">
                            {user?.email}
                        </p>

                    </div>

                </div>

                <hr className="my-8" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-gray-50 rounded-xl p-5">
                        <p className="text-gray-500">
                            Full Name
                        </p>

                        <h3 className="text-xl font-semibold mt-2">
                            {user?.name}
                        </h3>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5">
                        <p className="text-gray-500">
                            Email Address
                        </p>

                        <h3 className="text-xl font-semibold mt-2">
                            {user?.email}
                        </h3>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;