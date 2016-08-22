defmodule ElixirLangMoscow.BaseTest do
  alias ElixirLangMoscow.Repo

  alias ElixirLangMoscow.Speaker
  alias ElixirLangMoscow.Event
  alias ElixirLangMoscow.Registration
  alias ElixirLangMoscow.SuggestedTalk
  alias ElixirLangMoscow.Partner


  def valid_event do
    %{
      name: "some content",
      location: "some content",
      time_at: "2010-04-17 14:00:00",
      uid: "1",
      registration_link: "http://somelink.com",
      max_registrations: 20,
    }
  end
  def valid_speaker, do: %{name: "some content"}
  def valid_registration do
    %{
      company: "SomeCompany",
      first_name: "SomeName",
      last_name: "SomeSurname",
      email: "some@email.com",
      uid: "some-unique-uid",
      code: "some-unique-code",
      barcode: "some-unique-barcode",
      # event_id is set on demand, later on
    }
  end
  def valid_suggested_talk do
    %{
      email: "some@content.com",
      message: "some content",
      name: "some content",
      topic: "some content",
    }
  end
  def valid_partner do
    %{
      link: "some content",
      name: "some content",
      # image: %Plug.Upload{
      #   content_type: "image/png",
      #   filename: "test.png",
      #   path: Path.join([System.cwd!(), "test", "fixtures", "images", "test.png"]),
      # }
    }
  end

  def create_speaker do
    Speaker.changeset(%Speaker{}, valid_speaker()) |> Repo.insert!
  end

  def create_event do
    Event.changeset(%Event{}, valid_event()) |> Repo.insert!
  end

  # def create_partner do
  #   Partner.changeset(%Partner{}, valid_partner()) |> Repo.insert!
  # end

  def create_registration do
    create_registration(create_event())
  end
  def create_registration(event) do
    data = Map.put(valid_registration(), :event_id, event.id)
    Registration.changeset(%Registration{}, data) |> Repo.insert!
  end
  def create_suggested_talk() do
    SuggestedTalk.changeset(%SuggestedTalk{}, valid_suggested_talk())
    |> Repo.insert!
  end

end
