class AuthenticationController < ApplicationController
  # Permite el login sin estar autenticado previamente
  def login
    @user = User.find_by(email: params[:email])

    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      render json: { token: token, username: @user.email }, status: :ok
    else
      render json: { error: 'No autorizado' }, status: :unauthorized
    end
  end
end