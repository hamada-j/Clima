require 'rails_helper'

describe 'Clima API', type: :resource do

    describe 'GET /climas' do
        it 'return all history querys' do
            FactoryBot.create(:clima, query: "1, 2", numbers: "1, 2", result: 3)
            FactoryBot.create(:clima, query: "2, 2, abc", numbers: "2, 2", result: 4)

            { :get => "/climas" }

            expect(response).to have_http_status(nil)
            expect(JSON.parse(@climas.body).size).to eq(2)
        end
    end

    describe 'POST /climas' do
        it 'post one' do
            post '/climas', params: { clima: { query: "1, 2", numbers: "1, 2", result: 3 }}
        end
    end 
    
end