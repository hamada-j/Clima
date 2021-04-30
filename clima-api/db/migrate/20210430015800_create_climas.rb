class CreateClimas < ActiveRecord::Migration[6.1]
  def change
    create_table :climas do |t|
      t.text :query
      t.text :numbers
      t.float :result
      

      #t.timestamps
    end
  end
end
