defmodule ElixirLangMoscow.ExAdmin.Partner do
  use ExAdmin.Register

  register_resource ElixirLangMoscow.Partner do
    menu priority: 7

    scope :all, default: true

    query do
      %{all: []}
    end

    show partner do
      attributes_table do
        row :name
        row "Link", &(a(&1.link, href: &1.link))
        row "Avatar", &(img(src: Partner.image_url(&1), height: 100))
      end
    end

  end
end
