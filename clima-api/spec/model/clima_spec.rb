require 'rails_helper'

RSpec.describe Clima, :type => :model do
  it "is valid with valid attributes" do
    expect(Clima.create(query: "1, 2", numbers: "1, 2", result: 3)).to be_valid
  end
  it "is not valid without a title" do
    clima = Clima.create(query: nil)
    expect(clima).to_not be_valid
  end
end