require 'json'
require 'net/http'
require 'uri'

module Notepads
  API_URL = ENV.fetch('NOTEPADS_API_URL', 'http://localhost:8000')

  class Client
    def initialize(api_url = API_URL)
      @api_uri = URI(api_url)
    end

    def read(notepad_id)
      uri = URI.join(@api_uri.to_s + '/', "notepads/#{notepad_id}")
      response = Net::HTTP.get_response(uri)

      case response
      when Net::HTTPSuccess
        JSON.parse(response.body)
      when Net::HTTPNotFound
        raise "Notepad #{notepad_id} not found"
      else
        raise "API error: #{response.code} #{response.message}"
      end
    end
  end
end
