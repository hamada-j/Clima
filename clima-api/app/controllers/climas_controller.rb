
    class ClimasController < ApplicationController
      #before_action :set_clima, only: [:show, :update, :destroy]

      # GET /climas
      def index
        @climas = Clima.all
        #@climas = Clima.order(resul: :DESC)

        render json:  {status: 'success', messages: 'history', data: @climas }
      end

      # POST /climas
      def create

        @clima = Clima.new(
          query: clima_params[:query],
          numbers: clima_params[:numbers],
          result: clima_params[:result]
        )

        if @clima.save
          render json: @clima, status: :created, location: @clima
        else
          render json: @clima.errors, status: :unprocessable_entity
        end
      end

      


      private
        # Use callbacks to share common setup or constraints between actions.
        def set_clima
          @clima = Clima.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def clima_params
          params.require(:clima).permit(:query, :numbers, :result)
        end
    end



