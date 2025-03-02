# IU2FRL MQTT Stream Deck Plugin

A lightweight Stream Deck plugin that allows sending MQTT messages over WebSocket when Stream Deck buttons are pressed or dials are rotated.

## Features

- Send MQTT messages via WebSocket protocol
- Support for both standard buttons and dials/knobs
- Configurable MQTT connection settings
- Custom message payloads for different interactions
- SSL/TLS support
- Message retention option

## Installation

1. Download the latest release from the [releases page](https://github.com/iu2frl/StreamDock.Plugins.MqttWs/releases)
2. Double-click the `.streamDeckPlugin` file to install it on your Stream Deck software
3. The plugin should appear in your actions list under the "IU2FRL MQTT" category

For other clones (like the Ajazz AKP03 keypad), a manual installation is required:

1. Downlaod the latest release from the [releases page](https://github.com/iu2frl/StreamDock.Plugins.MqttWs/releases)
    - Select the `-manual.zip` file
2. Unzip the file to the software's plugin folder
    - Windows: `%appdata%\HotSpot\StreamDock\Plugins`
3. Restart the AJAZZ Stream Dock software

## Button Configuration

The button action allows you to send MQTT messages when a button is pressed or released:

1. Add the "MQTT Button action" to your Stream Deck
2. Configure the MQTT connection settings:
   - Broker: IP address or hostname of your MQTT broker
   - Port: WebSocket port of your MQTT broker (typically 9001)
   - Username/Password: If your broker requires authentication
   - SSL: Enable if your broker uses secure WebSocket (WSS)
   - Client ID: A unique identifier for this connection (generated automatically if empty)
3. Configure the payload settings:
   - Topic: The MQTT topic to publish to
   - Key Down: Message to send when button is pressed
   - Key Up: Message to send when button is released
   - Retain: Whether the broker should retain the last message

## Dial/Knob Configuration

The dial action allows you to send MQTT messages when a dial is rotated:

1. Add the "MQTT Knob action" to your Stream Deck
2. Configure the MQTT connection settings as described above
3. Configure the payload settings:
   - Topic: The MQTT topic to publish to
   - Dial Down: Message to send when dial is pressed
   - Dial Up: Message to send when dial is released
   - Rotate clockwise: Message to send when dial is rotated clockwise
   - Rotate counter-clockwise: Message to send when dial is rotated counter-clockwise
   - Retain: Whether the broker should retain the last message

## Example Use Cases

- Control IoT devices (lights, thermostats, etc.)
- Interface with home automation systems
- Integrate with custom software that supports MQTT
- Send commands to radio equipment supporting MQTT control

## Requirements

- Stream Deck software v2.9 or later
- Windows 10 or macOS 10.11 or later
- MQTT broker with WebSocket support

## Credits

- Created by Luca Bennati (IU2FRL)
- Uses the Paho MQTT JavaScript client library for WebSocket communication

## License

Distributed with GNU General Public License v3.0
