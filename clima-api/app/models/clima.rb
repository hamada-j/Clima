class Clima < ApplicationRecord
    validates :query, presence: true
end
